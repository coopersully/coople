import base64
from datetime import datetime

from flask import Flask, render_template, request, jsonify, json, redirect

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/game', methods=['GET', 'POST'])
def game():
    return render_template('game.html')


@app.route('/play')
def play():
    return render_template('play.html')


@app.route('/results')
def results():
    return render_template('results.html')


@app.route('/encode', methods=['POST'])
def encode():
    params = request.json
    encoded_params = base64.urlsafe_b64encode(json.dumps(params).encode()).decode()
    return jsonify({'encodedParams': encoded_params})


@app.route('/decode', methods=['POST'])
def decode():
    encoded_params = request.json.get('encodedParams')
    params = json.loads(base64.urlsafe_b64decode(encoded_params).decode())
    return jsonify(params)


@app.route('/daily/')
def daily():
    # Get current day of the year
    day_of_year = datetime.now().timetuple().tm_yday

    # Open the puzzles file and load data as a list of dictionaries
    with open('static/puzzles.json', 'r') as file:
        puzzles = json.load(file)

    # Make sure we wrap around to the start of the list if we've exceeded its length
    puzzle_of_day = puzzles[day_of_year % len(puzzles)]

    # Encode the params
    params = {
        'name': 'Daily Coople',
        'word': puzzle_of_day['word'],
        'guesses': len(puzzle_of_day['word']) + 1,
        'hint': puzzle_of_day['hint'],
        'suffix': 0,
    }
    encoded_params = base64.urlsafe_b64encode(json.dumps(params).encode()).decode()

    # Redirect to the play route with the word and hint of the day
    return redirect(f"/play?data={encoded_params}", code=302)


if __name__ == '__main__':
    app.run(debug=True)
