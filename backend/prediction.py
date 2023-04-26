from flask import Flask, request, jsonify, Blueprint
import pickle

predict_bp = Blueprint('prediction', __name__)

clf = pickle.load(open('Sclf.pkl', 'rb'))
loaded_vec = pickle.load(open('Scount_vect.pkl', 'rb'))

@predict_bp.route('/prediction', methods=['POST'])
def result():
    data = request.get_json(force=True)
    tweets = [data[f'Data{i+1}'] for i in range(5)]
    predictions = clf.predict(loaded_vec.transform(tweets))
    overall_sentiment = max(set(predictions), key=list(predictions).count)
    return jsonify([overall_sentiment])