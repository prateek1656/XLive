#importing flask components
from flask import Flask, jsonify, Response, render_template, request
from flask_restful import Api, Resource
#importing mongoDB client components
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
#importing missilienious components
from dotenv import load_dotenv
import os
import cv2
import os
from bson import ObjectId

# from models.overlay import overlay_settings
cap = cv2.VideoCapture(os.environ.get("RSTP_URL"))

#initiating the app
load_dotenv()
app = Flask(__name__)
api = Api(app)

uri = os.environ.get("MONGO_URI")
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.get_database("XLive")
collection = db.get_collection("Init")

#routes
#home route
@app.route('/')
def index():
    return render_template('index.html')
#to check the connection with mongoDB
@app.route('/check_connection')
def check_connection():
    try:
        client.admin.command('ping')
        return jsonify({"message": "Successfully connected to MongoDB!"})
    except Exception as e:
        return jsonify({"error": str(e)})

def generate_frames():
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            # Encode the frame to JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            if not ret:
                continue
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/feed', methods=['GET'])
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
  
  

@app.route('/overlays', methods=['GET'])
def get_overlays():
    # Retrieve overlays from the database and render a template or return JSON response
    overlays = list(collection.find())
    return jsonify(overlays)

@app.route('/overlays/create', methods=['POST'])
def create_overlay():
    data = request.json
    overlay = {
        "name": data["name"],
        "position_x": data["position_x"],
        "position_y": data["position_y"],
        "content": data["content"]
    }
    result = collection.insert_one(overlay)
    return jsonify({"message": "Overlay created", "overlay_id": str(result.inserted_id)})


@app.route('/overlays/<overlay_id>', methods=['GET'])
def get_overlay(overlay_id):
    overlay = collection.find_one({"_id": ObjectId(overlay_id)})
    if overlay:
        overlay['_id'] = str(overlay['_id'])
        return jsonify(overlay)
    else:
        return jsonify({"error": "Overlay not found"}), 404

@app.route('/overlays/<overlay_id>/update', methods=['POST'])
def update_overlay(overlay_id):
    data = request.json
    
    update_data = {
        "name": data["name"],
        "position_x": data["position_x"],
        "position_y": data["position_y"],
        "content": data["content"]
    }
    
    result = collection.update_one({"_id": ObjectId(overlay_id)}, {"$set": update_data})
    
    if result.modified_count > 0:
        return jsonify({"message": "Overlay updated"})
    else:
        return jsonify({"error": "Overlay not found"}), 404

@app.route('/overlays/<overlay_id>/delete', methods=['POST'])
def delete_overlay(overlay_id):

    result = collection.delete_one({"_id": ObjectId(overlay_id)})
    
    if result.deleted_count > 0:
        return jsonify({"message": "Overlay deleted"})
    else:
        return jsonify({"error": "Overlay not found"}), 404
    

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5001)

