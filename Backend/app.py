from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from ml_model import analyze_images
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Configure upload folder and allowed extensions
UPLOAD_FOLDER = './static/uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Helper function to check allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Generic route to handle image uploads for analysis
def process_images_for_category(category):
    if 'previous_image' not in request.files or 'current_image' not in request.files:
        return jsonify({"error": "Please provide both previous and current images"}), 400

    previous_image = request.files['previous_image']
    current_image = request.files['current_image']

    if previous_image and allowed_file(previous_image.filename) and current_image and allowed_file(current_image.filename):
        prev_filename = secure_filename(previous_image.filename)
        curr_filename = secure_filename(current_image.filename)

        previous_image_path = os.path.join(app.config['UPLOAD_FOLDER'], prev_filename)
        current_image_path = os.path.join(app.config['UPLOAD_FOLDER'], curr_filename)

        # Save images
        previous_image.save(previous_image_path)
        current_image.save(current_image_path)

        # Analyze images with the ML model
        progress_data = analyze_images(previous_image_path, current_image_path, category)

        return jsonify(progress_data), 200
    else:
        return jsonify({"error": "Invalid file types"}), 400

# API route for foundation analysis
@app.route('/upload/foundation', methods=['POST'])
def foundation_analysis():
    return process_images_for_category('foundation')

# API route for super structure analysis
@app.route('/upload/superstructure', methods=['POST'])
def superstructure_analysis():
    return process_images_for_category('superstructure')

# API route for interiors analysis
@app.route('/upload/interiors', methods=['POST'])
def interiors_analysis():
    return process_images_for_category('interiors')

if __name__ == '__main__':
    # Create upload folder if it doesn't exist
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    
    app.run(debug=True)
