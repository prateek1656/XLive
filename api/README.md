Real-time video streaming from an RTSP source and interacts with a MongoDB database to manage video overlays. It serves as a foundation for building a web-based video streaming platform with overlay management.


Before running the application, make sure you have the following prerequisites installed:

Python
Flask
Flask-RESTful
OpenCV (cv2)
pymongo
ffmpeg-python
dotenv
Video.js (for HLS video playback)


Project Structure
The project consists of a Flask application with the following components:

app.py: The main Flask application script.
templates: Contains HTML templates (e.g., index.html for the home page).
static/hls: Directory to store HLS video streaming files.
.env: Environment variables configuration file.
models: (Commented out) Import statements for overlay settings.


Endpoints
1. Home
Route: /
Description: The default home page of the application, which can be customized in index.html.
2. Check Connection to MongoDB
Route: /check_connection
Method: GET
Description: Checks the connection to the MongoDB database specified in the .env file.
3. Video Streaming
Route: /feed
Method: GET
Description: Provides real-time video streaming from an RTSP source. It uses OpenCV to capture frames and serve them as a multipart MJPEG response.
4. HLS Video Streaming
Route: /hls
Method: GET
Description: Converts the RTSP stream into HLS format using FFmpeg. The HLS stream is accessible at this endpoint for video playback.
5. Overlay Management
Route: /overlays

Method: GET

Description: Retrieves overlay data from a MongoDB collection and returns it as JSON.

Route: /overlays/create

Method: POST

Description: Creates a new overlay in the MongoDB collection. Expects JSON data with overlay details.

Route: /overlays/<overlay_id>

Method: GET

Description: Retrieves a specific overlay by its ID from the MongoDB collection and returns it as JSON.

Route: /overlays/<overlay_id>/update

Method: POST

Description: Updates an existing overlay in the MongoDB collection. Expects JSON data with updated overlay details.

Route: /overlays/<overlay_id>/delete

Method: POST

Description: Deletes an overlay from the MongoDB collection by its ID.

Usage
Ensure that you have met the prerequisites and have configured the environment variables in the .env file.
Run the Flask application using the command: python app.py.
Access the application in a web browser at http://localhost:5001.

