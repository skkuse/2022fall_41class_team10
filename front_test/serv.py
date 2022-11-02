from flask import Flask, request
from flask_cors import CORS
import unittest
import sys
from io import StringIO
import json
class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)

app = Flask(__name__)
CORS(app)

@app.route("/hello", methods=['GET'])
def hello():
  return "hello world"

test_case = {
} 
test_case['pro1'] = [1, 3] 
test_case['pro2'] : [4, 5]
test_answer = {
    'pro1' : 4, 
    'pro2' : 9
}
@app.route("/submit", methods=['POST'])
def submit():
    data = request.get_json()

    old_stdout = sys.stdout
    redirected_output = sys.stdout = StringIO()

    #exec(data['code'])(*test_case['pro1'])
    exec(data['code'])
    sys.stdout = old_stdout
    result = redirected_output.getvalue()
    return result
if __name__=='__main__':
    app.run(debug=True)