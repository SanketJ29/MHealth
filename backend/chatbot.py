from flask import Flask, request, jsonify, Blueprint
import openai
import pickle
import requests
import gradio as gr

openai.api_key = "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"

chatbot_bp = Blueprint('chatbot', __name__)
clf = pickle.load(open('Sclf.pkl', 'rb'))
loaded_vec = pickle.load(open('Scount_vect.pkl', 'rb'))

@chatbot_bp.route('/chatbot', methods = ['POST'])
def chatbot():
    global messages
    
    data = request.get_json(force=True)
    user_input = data["input"]
    
    messages = [{"role": "system", "content": "You are a psychologist"}]
    messages.append({"role": "user", "content": user_input})
    
    # check if input contains prediction keywords
    keywords = ['predict', 'diagnose', 'test']
    predict = any(keyword in user_input for keyword in keywords)
    
    # if predict is True, make a prediction using the trained models
    if predict:
        result = clf.predict(loaded_vec.transform([user_input]))[0]
        messages.append({"role": "assistant", "content": result})
    else:
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"{messages[-2]['content']} {user_input}",
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        ChatGPT_reply = response["choices"][0]["text"]
        messages.append({"role": "assistant", "content": ChatGPT_reply})
    
    return jsonify(messages[-1]["content"])

gradio_bp = Blueprint('gradioui', __name__)
def chatbot_function(text):
    response = requests.post('http://localhost:5000/chatbot', json={'input': text})
    return response.json()

chatbot_interface = gr.Interface(fn=chatbot_function, inputs=gr.inputs.Textbox(lines=2, label="User Input"), outputs="text", title="Chatbot")

@gradio_bp.route('/', methods=['GET'])
def gradio_fn():
    return chatbot_interface.launch()
