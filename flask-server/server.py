import time
import random
import logging
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.INFO)

# ✅ Load Gemini API Key from .env
GENAI_API_KEY = os.getenv("GENAI_API_KEY")
if not GENAI_API_KEY:
    raise ValueError("❌ GENAI_API_KEY is missing in .env")

genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash-lite")

# 🎨 Creative fallback messages
CREATIVE_ERROR_MESSAGES = [
    "🤖 The quiz bot got sleepy. Some questions are still cooking.",
    "⏳ Our AI chef ran out of ingredients. A few questions couldn't be served.",
    "🚧 Question generator hit traffic. Only a few made it through.",
    "🌐 Too many requests! Some questions are still waiting in line.",
    "⚡ The generator is cooling down. Try again soon for a full batch.",
    "📉 AI quota limit reached. But here’s what we could gather for now!",
]

# 🔁 Single question generator with retry
def generate_question(text, keyword, q_type, difficulty):
    prompt = f"""
    From the following input, generate a {q_type} type question with {difficulty} difficulty.
    Focus on the keyword: {keyword}.
    Avoid repeating earlier questions.

    Input:
    {text}

    Output:
    """
    try:
        response = model.generate_content(prompt)
        raw_output = response.text.strip()
        question = raw_output
        options = []

        if q_type == "MCQ":
            lines = question.split("\n")
            question = lines[0]
            options = [line.strip("- ").strip() for line in lines[1:] if line.strip()]

        return {"question": question, "options": options}
    except Exception as e:
        logging.error(f"Error generating question: {e}")
        return None

# 🔁 Retry logic with exponential backoff
def retry_generate_question(text, keyword, q_type, difficulty, retries=3, delay=2):
    for attempt in range(retries):
        result = generate_question(text, keyword, q_type, difficulty)
        if result:
            return result
        logging.warning(f"Retry {attempt + 1} failed for {q_type} question with keyword '{keyword}'. Retrying...")
        time.sleep(delay * (2 ** attempt))
    logging.error(f"Failed to generate {q_type} question after {retries} attempts.")
    return None

# 🎯 Pick keyword from input text
def highlight_keyword(text):
    words = [w.strip(".,:;!?") for w in text.split() if len(w) > 3]
    return random.choice(words) if words else "concept"

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.get_json()
    text = data.get("text", "")
    q_type = data.get("type", "MCQ")
    difficulty = data.get("difficulty", "Easy")
    num_questions = int(data.get("num_questions", 1))

    keyword = highlight_keyword(text)
    results = []

    for i in range(num_questions):
        result = retry_generate_question(text, keyword, q_type, difficulty)
        if result:
            results.append(result)
        else:
            logging.warning(f"Question {i + 1} failed to generate.")

    failed_count = num_questions - len(results)
    response = {"questions": results}

    if failed_count > 0:
        response["message"] = random.choice(CREATIVE_ERROR_MESSAGES) + f" {failed_count} questions failed."

    logging.info(f"Generated {len(results)} questions successfully. Failed to generate {failed_count}.")
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
