from flask import Flask, request, jsonify
import cv2
import pytesseract
from pytesseract import Output
from PIL import Image
import io
import numpy

app = Flask(__name__)

@app.route('/data', methods=['Get', 'POST'])
def upload():
    if request.method == 'POST':
        # Get uploaded image file
        img_file = request.files['image']
        # Read image with OpenCV
        img = cv2.imdecode(numpy.fromstring(img_file.read(), numpy.uint8), cv2.IMREAD_UNCHANGED)
        # Convert image to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # Perform OCR on grayscale image
        data = pytesseract.image_to_data(gray, output_type=Output.DICT)
        # Get amount of text boxes
        amount_boxes = len(data['text'])
        # Loop through text boxes and add bounding boxes and text to image
        for i in range(amount_boxes):
            if float(data['conf'][i]) > 2:
                (x, y, width, height) = (data['left'][i], data['top'][i], data['width'][i], data['height'][i])
                img = cv2.rectangle(img, (x,y), (x+width, y+height), (0, 255, 0), 2)
                # img = cv2.putText(img, data['text'][i], (x,y+height+20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,0), 2, cv2.LINE_AA)
                print(data['text'][i])
        # Convert OpenCV image to Pillow image
        pil_image = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        # Convert Pillow image to bytes and store in memory buffer
        buf = io.BytesIO()
        pil_image.save(buf, format='JPEG')
        # Get buffer value as bytes and send as response
        buf.seek(0)
        response = buf.getvalue()
        return response, 200, {'Content-Type': 'image/jpeg'}
    else:
        return jsonify({'message': 'Method not allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)
