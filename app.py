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

@app.route('/cars')
def cars():
    return send_file('frontend/cars.html')
	
if __name__ == '__main__':
	app.run(debug=True)
