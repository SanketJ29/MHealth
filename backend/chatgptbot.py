from flask import Flask, request, jsonify, Blueprint
import openai
import os

chat_bp = Blueprint('chatgpt', __name__)

# Configure OpenAI API key
os.environ["OPENAI_API_KEY"] = "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"
# openai.api_key = "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"
print(dir(openai))
# Endpoint for ChatGPT component
@chat_bp.route("/chatgpt", methods=["POST"])
def chat_gpt():
    # Get the user's input text from the request
    print('Hello')
    input_text = request.json['data']['inputText']
    print(input_text)

    # Use the OpenAI API to generate a response
    response = openai.Completion.create(
        engine='davinci',
        prompt=input_text,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
    )

    # Extract the generated response from the API response
    response_text = response.choices[0].text.strip()

    # Return the generated response as a JSON object
    return jsonify(response_text)
