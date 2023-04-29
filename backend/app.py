from flask import Flask
from audit import audit_bp
from prediction import predict_bp
from chatgptbot import chat_bp

app = Flask(__name__)
app.register_blueprint(audit_bp)
app.register_blueprint(predict_bp)
app.register_blueprint(chat_bp)
if __name__ == '__main__':
    app.run(debug = True)