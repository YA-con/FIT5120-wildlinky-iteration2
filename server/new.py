from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

if not api_key:
    print("❌ API key not found")
else:
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key
    )

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat-v3-0324:free",
        messages=[{"role": "user", "content": "Say hello!"}]
    )

    print(response.choices[0].message.content)
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

# Load environment variables
load_dotenv()

# Flask app setup
app = Flask(__name__)
CORS(app)

# API keys and client setup
api_key = os.getenv("OPENROUTER_API_KEY")
if not api_key:
    raise ValueError("OPENROUTER_API_KEY not found!")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key
)

@app.route('/api/generate-email', methods=['POST'])
def generate_email():
    data = request.get_json()

    issue = data.get('issue', '').strip()
    focus = data.get('focus', '').strip() or 'No specific concern provided.'
    modifiers = data.get('modifiers', {})

    if not issue:
        return jsonify({'error': 'Missing issue'}), 400

    length = modifiers.get('Length', 'Auto')
    style = modifiers.get('Style', 'Auto')
    tone = modifiers.get('Tone', 'Auto')
    mood = modifiers.get('Mood', 'Auto')

    prompt = f"""
You are writing an advocacy email to a local Victorian council. Follow the user's inputs and preferences strictly.

ISSUE:
"{issue}"

USER'S SPECIFIC CONCERN:
"{focus}"

PREFERRED EMAIL STYLE:
- Length: {length}
- Style: {style}
- Tone: {tone}
- Mood: {mood}

Please write a respectful, persuasive, and impactful advocacy email starting with:
"Dear Council,"

And ending with:
"Sincerely, A concerned Victorian resident"

Ensure the message reflects the issue, user concern (if any), and style preferences.
"""

    try:
        completion = client.chat.completions.create(
            model="deepseek/deepseek-chat-v3-0324:free",
            messages=[{"role": "user", "content": prompt}]
        )

        reply = completion.choices[0].message.content.strip()
        if not reply:
            return jsonify({'error': 'Empty response from model'}), 500

        return jsonify({'email': reply})

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Failed to generate email', 'details': str(e)}), 500

# Debug info
if __name__ == '__main__':
    print("[INIT] Server starting...")
    print("[DEBUG] API Key Loaded:", bool(api_key))
    app.run(debug=True)
