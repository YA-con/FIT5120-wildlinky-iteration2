from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv
from geopy.distance import geodesic
import openai
import os
import math


load_dotenv()

app = Flask(__name__)
CORS(app, origins="*")



url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
openai.api_key = os.getenv("OPENAI_API_KEY")

print(f"[DEBUG] SUPABASE_URL: {url,key}")

supabase = create_client(url, key)

cached_species_locations = []
cached_species_summary = {}


def get_all_species_locations():
    all_data = []
    batch_size = 1000
    offset = 0

    while True:
        response = supabase \
            .table("species_locations") \
            .select("*") \
            .range(offset, offset + batch_size - 1) \
            .execute()

        batch = response.data
        if not batch:
            break
        all_data.extend(batch)
        if len(batch) < batch_size:
            break
        offset += batch_size

    return all_data

def load_species_data():
    global cached_species_locations
    cached_species_locations = get_all_species_locations()
    print(f"[INIT] Loaded {len(cached_species_locations)} species location records into cache.")

def load_species_summary():
    global cached_species_summary
    print("[INIT] Calculating species summary...")

    threatened_res = supabase.table("threatened_species").select("*").execute()
    threatened_species_data = threatened_res.data
    species_lookup = {s['species_id']: s['name'] for s in threatened_species_data}

    suburb_res = supabase.table("suburb_locations").select("id, suburb, lat, long").execute()
    suburb_data = suburb_res.data

    suburb_coords = {}
    for s in suburb_data:
        name = s.get('suburb')
        if name and name not in suburb_coords:
            lat = s.get('lat')
            lon = s.get('long')
            if lat is not None and lon is not None:
                suburb_coords[name] = {"lat": lat, "long": lon}

    def find_nearest_suburb(lat, lon):
        min_distance = float('inf')
        nearest_suburb = None
        for s in suburb_data:
            s_lat, s_lon = s.get('lat'), s.get('long')
            if s_lat is None or s_lon is None:
                continue
            distance = math.sqrt((lat - s_lat) ** 2 + (lon - s_lon) ** 2)
            if distance < min_distance:
                min_distance = distance
                nearest_suburb = s['suburb']
        return nearest_suburb

    suburb_seen = set()
    suburb_results = []

    for item in cached_species_locations:
        lat, lon = item.get('lat'), item.get('long')
        if lat is None or lon is None:
            continue

        suburb = find_nearest_suburb(lat, lon)
        if not suburb or suburb in suburb_seen:
            continue

        suburb_records = [
            i for i in cached_species_locations
            if find_nearest_suburb(i.get('lat'), i.get('long')) == suburb
        ]
        total_count = len(suburb_records)

        species_count = {}
        for rec in suburb_records:
            sid = rec.get('species_id')
            if sid is not None:
                species_count[sid] = species_count.get(sid, 0) + 1

        species_breakdown = [
            {
                "species_id": sid,
                "name": species_lookup.get(sid, "Unknown"),
                "count": count
            }
            for sid, count in species_count.items()
        ]

        suburb_lat = suburb_coords.get(suburb, {}).get('lat')
        suburb_lon = suburb_coords.get(suburb, {}).get('long')

        suburb_results.append({
            "suburb": suburb,
            "lat": suburb_lat,
            "long": suburb_lon,
            "count": total_count,
            "species_breakdown": species_breakdown
        })

        suburb_seen.add(suburb)

    cached_species_summary = {
        "threatened_species": threatened_species_data,
        "species_counts_by_suburb": suburb_results
    }

    print(f"[INIT] Summary ready. Suburbs counted: {len(suburb_results)}")



@app.route('/api/species-summary', methods=['GET'])
def get_species_summary():
    return jsonify(cached_species_summary)

@app.route('/api/species-locations/timeseries', methods=['GET'])
def get_species_timeseries():
    species_id = request.args.get('species_id')
    filtered = [item for item in cached_species_locations if 2000 <= item.get('year', 0) <= 2020]

    if species_id:
        species_id = int(species_id)
        filtered = [item for item in filtered if item.get('species_id') == species_id]

    year_totals = {}
    for item in filtered:
        year = item['year']
        count = item.get('count', 1)
        year_totals[year] = year_totals.get(year, 0) + count

    result = [{"year": year, "total": total} for year, total in sorted(year_totals.items())]
    return jsonify(result)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"error": "Missing message"}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": user_message}
            ],
            temperature=0.7
        )
        reply = response['choices'][0]['message']['content'].strip()
        return jsonify({"reply": reply})
    except Exception as e:
        print(f"Error communicating with OpenAI: {e}")
        return jsonify({"error": "Failed to get response"}), 500

@app.route('/api/policies-with-supporters', methods=['GET'])
def get_policies_with_supporters():
    policies_res = supabase.table("policies").select("*").execute()
    policies = policies_res.data
    supporters_res = supabase.table("policy_supporters").select("*").execute()
    supporters = supporters_res.data

    from collections import defaultdict
    policy_supporter_map = defaultdict(list)
    for s in supporters:
        if s.get("voted") == True:  
            policy_supporter_map[s["policy_id"]].append({
                "full_name": s["full_name"],
                "party": s["party"],
                "electorate": s["electorate"],
                "house": s["house"],
                "agreement": s.get("agreement")
            })

    result = []
    for policy in policies:
        result.append({
            "id": policy["id"],
            "name": policy["name"],
            "description": policy["description"],
            "supporters": policy_supporter_map.get(policy["id"], [])
        })

    return jsonify(result)


@app.route('/api/species-filtered-locations', methods=['GET'])
def get_filtered_species_locations():
    species_id = request.args.get('species_id', type=int)
    postcode = request.args.get('postcode')
    postcode = str(postcode).strip().replace('"', '').replace("'", '')

    result_data = []
    species_info = None

    threatened_res = supabase.table("threatened_species").select("*").execute()
    threatened_species_list = threatened_res.data
    species_map_full = {s['species_id']: s for s in threatened_species_list}

    if species_id:
        species_info = species_map_full.get(species_id)

    if species_id and not postcode:
        filtered = [item for item in cached_species_locations if item.get('species_id') == species_id]
        result_data = [
            {
                "lat": item.get("lat"),
                "long": item.get("long"),
                "year": item.get("year"),
                "period": item.get("period")
            }
            for item in filtered
            if item.get("lat") is not None and item.get("long") is not None
        ]
    elif postcode and not species_id:
        suburb_res = supabase.table("suburb_locations").select("lat, long").eq("postcode", postcode).limit(1).execute()
        if suburb_res.data:
            origin = (suburb_res.data[0]['lat'], suburb_res.data[0]['long'])
            result_data = [
                {
                    "lat": item.get("lat"),
                    "long": item.get("long"),
                    "year": item.get("year"),
                    "period": item.get("period")
                }
                for item in cached_species_locations
                if item.get("lat") is not None and item.get("long") is not None and
                   geodesic(origin, (item['lat'], item['long'])).km <= 200
            ]
    elif postcode and species_id:
        suburb_res = supabase.table("suburb_locations").select("lat, long").eq("postcode", postcode).limit(1).execute()
        if suburb_res.data:
            origin = (suburb_res.data[0]['lat'], suburb_res.data[0]['long'])
            filtered = [
                item for item in cached_species_locations
                if item.get('species_id') == species_id and
                   item.get("lat") is not None and item.get("long") is not None and
                   geodesic(origin, (item['lat'], item['long'])).km <= 20
            ]
            result_data = [
                {
                    "lat": item.get("lat"),
                    "long": item.get("long"),
                    "year": item.get("year"),
                    "period": item.get("period")
                }
                for item in filtered
            ]

    return jsonify({
        "species_id": species_id,
        "species_info": species_info,
        "result": result_data
    })

@app.route('/api/council', methods=['GET'])
def get_council_by_postcode():
    postcode = request.args.get('postcode', '').strip()
    print(f"[DEBUG] Received postcode: '{postcode}'")

    if not postcode:
        return jsonify({'error': 'Missing postcode'}), 400
    postcode = str(postcode)
    print(type(postcode))
    try:
        response = supabase \
            .table("vic_council_details") \
            .select("council_name, email, tel_phone, website, address") \
            .eq("postcode", postcode) \
            .limit(1) \
            .execute()

        print(f"[DEBUG] DB response: {response.data}")

        if response.data and len(response.data) > 0:
            council = response.data[0]
            return jsonify({
                "name": council["council_name"],
                "email": council["email"],
                "phone": council["tel_phone"],
                "website": council["website"],
                "address": council["address"]
            })
        else:
            return jsonify({}), 404
    except Exception as e:
        print(f"Error fetching council by postcode: {e}")
        return jsonify({'error': 'Internal server error'}), 500



@app.route('/api/generate-email', methods=['POST'])
def generate_email():

    data = request.get_json()
    issue = data.get('issue', '')
    focus = data.get('focus', '')
    modifiers = data.get('modifiers', {})

    if not issue:
        return jsonify({'error': 'Missing issue'}), 400

    mod_text = ', '.join([f"{k}: {v}" for k, v in modifiers.items()]) or 'None'
    prompt = f"""
    You are writing an advocacy email to a local Victorian council. Follow the user's inputs and preferences strictly.

    ISSUE:
    "{issue}"

    USER'S SPECIFIC CONCERN (if provided):
    "{focus or 'No specific concern provided.'}"

    PREFERRED EMAIL STYLE:
    - Length: {modifiers.get('Length', 'Auto')}
    - Style: {modifiers.get('Style', 'Auto')}
    - Tone: {modifiers.get('Tone', 'Auto')}
    - Mood: {modifiers.get('Mood', 'Auto')}

    Please write a respectful, persuasive, and impactful advocacy email starting with:
    "Dear Council,"

    And ending with:
    "Sincerely, A concerned Victorian resident"

    Make sure the message reflects the issue, user concern (if any), and style preferences.
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=500
        )
        reply = response['choices'][0]['message']['content'].strip()
        return jsonify({'email': reply})
    except Exception as e:
        print(f"Error generating email: {e}")
        return jsonify({'error': 'Failed to generate email'}), 500


def initialize_server_data():
    load_species_data()
    load_species_summary()

initialize_server_data()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)