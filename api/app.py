#importing flask components
from flask import Flask, jsonify
#importing mongoDB client components
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
#importing missilienious components
from dotenv import load_dotenv
import os

#initiating the app
app = Flask(__name__)
load_dotenv()

# connecting to mongoDB
uri = os.environ.get("MONGO_URI")
client = MongoClient(uri, server_api=ServerApi('1'))

#routes
#home route
@app.route('/')
def index():
    return 'Hello, World!'
#to check the connection with mongoDB
@app.route('/check_connection')
def check_connection():
    try:
        client.admin.command('ping')
        return jsonify({"message": "Successfully connected to MongoDB!"})
    except Exception as e:
        return jsonify({"error": str(e)})




if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5001)

