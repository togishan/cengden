from flask import Flask, send_file
import datetime

x = datetime.datetime.now()


app = Flask(__name__)



@app.route('/')
def home():
    return send_file('frontend/index.html')

@app.route('/refresh', methods=['POST'])
def refresh():
    return "hello za warudo"

	
if __name__ == '__main__':
	app.run(debug=True)
