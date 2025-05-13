from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv
from geopy.distance import geodesic
import openai
import os
import math


load_dotenv()
import os
import requests

app = Flask(__name__)
CORS(app)


url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
openai.api_key = os.getenv("OPENAI_API_KEY")
print(f"[DEBUG] SUPABASE_URL: {url,key}")
print(f"[DEBUG] OPENAI_API_KEY: {openai.api_key}")
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

@app.route('/api/generate-email', methods=['POST'])
def generate_email():
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

    data = request.json
    issue = data.get('issue', '')

    print("========== DEBUGGING ==========")
    print("Received issue from frontend:", issue)
    print("Loaded GEMINI_API_KEY:", GEMINI_API_KEY)

    if not GEMINI_API_KEY:
        print(" No API Key loaded from .env!")

    if not issue:
        print(" No issue provided!")

    headers = {
        "Content-Type": "application/json"  # 
    }

    prompt = (
        "Your task is to write a passionate and persuasive conservation advocacy email "
        "focused on the issue of land clearing in Victoria, Australia. The email should "
        "be structured as follows:\n\n"
        "1. **Subject Line:** Create a subject line that immediately grabs attention and "
        "clearly states the urgency of the matter.\n\n"
        "2. **Introduction (Address):** Politely address the email to 'Dear Council Members' "
        "to convey respect and professionalism.\n\n"
        "3. **Issue Presentation:** Clearly outline the issue of land clearing, emphasizing "
        "its detrimental effects on the environment and biodiversity within Victoria. Include "
        "factual evidence and avoid personal opinions or biases.\n\n"
        "4. **Solution Motivation:** Encourage the council to act by proposing actionable "
        "solutions, such as stricter regulations and collaboration with environmental "
        "organisations, to curb land clearing.\n\n"
        "5. **Conclusion:** Politely, yet assertively, urge the council to consider the "
        "long-term impacts and act decisively to preserve Victoria's natural beauty and "
        "biodiversity.\n\n"
        "**Additional Guidelines:**\n"
        "- Use Australian English.\n"
        "- Keep the tone engaging, professional, firm, and assertive.\n"
        "- Avoid technical jargon or complex language to ensure accessibility to a general audience.\n"
        "- The email should be no more than 200 words.\n\n"
        "Please focus on these distinct steps to create a coherent and impactful advocacy email."
    )

    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    try:
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",  # 
            headers=headers,
            params={"key": GEMINI_API_KEY},
            json=payload
        )


        print("Gemini Raw Response:", response.text)

        if response.status_code == 200:
            result = response.json()
            generated_text = result['candidates'][0]['content']['parts'][0]['text']
            return jsonify({"email": generated_text})
        else:
            print(" Error from Gemini API:", response.text)
            return jsonify({"error": "Gemini API Error", "details": response.text}), response.status_code

    except Exception as e:
        print(" Exception:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500

def initialize_server_data():
    load_species_data()
    load_species_summary()

initialize_server_data()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)