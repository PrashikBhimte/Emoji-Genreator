from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from os import getenv

server = Flask(__name__)
CORS(server)

def genreate_image(prompt):
    np.random.seed(abs(hash(prompt)) % (2**32))
    return np.random.randint(0, 256, size=(64, 64, 3), dtype=np.uint8).tolist()

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