from flask import Flask, send_from_directory, jsonify
import os

app = Flask(__name__)

# Serve static files from the 'build' folder
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("my-react-app/build/" + path):
        return send_from_directory('my-react-app/build', path)
    else:
        return send_from_directory('my-react-app/build', 'index.html')

# Define your API routes here
@app.route('/api/data')
def get_data():
    data = {'key': 'value'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
    