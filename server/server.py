from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from os import getenv
import joblib
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('punkt_tab')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import os
from PIL import Image

server = Flask(__name__)
CORS(server)

model = joblib.load('./model/emoji_classifier_model.pkl')
vectorizer = joblib.load('./model/emoji_vectorizer.pkl')

stop_words = set(stopwords.words('english'))

def preprocess(text):
    tokens = word_tokenize(text.lower())
    tokens = [t for t in tokens if t.isalpha() and t not in stop_words]
    return " ".join(tokens)

def load_and_process_image(category):
    image_path = os.path.join("images", f"{category}.png")
    if not os.path.exists(image_path):
        image_path = os.path.join("images", "question_mark.png")
    
    img = Image.open(image_path).convert("RGB")
    img = img.resize((64, 64))
    
    img_array = np.array(img)
    
    return img_array

def genreate_image(prompt):

    cleaned = preprocess(prompt)
    features = vectorizer.transform([cleaned])
    prediction = model.predict(features)[0]

    image_array = load_and_process_image(prediction)

    return image_array.tolist()

@server.route('/', methods=['POST'])
def handle_request():
    body = request.get_json()
    try :
        prompt = body['prompt']

        if not isinstance(prompt, str):
            return jsonify({"error": "Invalid prompt type, expected string"}), 400
        
        image = genreate_image(prompt)
        return jsonify({"image": image}), 200

    except KeyError:
        return jsonify({"error": "Missing 'prompt' key in request body"}), 400
    
if __name__ == '__main__':
    server.run(host='0.0.0.0', port=int(getenv('PORT', 5000)))