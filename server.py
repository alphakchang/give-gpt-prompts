from flask import Flask, render_template, request
import openai

openai.api_key = ""

app = Flask(__name__)

if __name__ == '__main__':
    app.run()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gpt', methods=['POST'])
def gpt():
    completion = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{
            'role': 'user',
            'content': request.json['final_input']
        }]
    )
    reply = completion.choices[0].message.content
    return {'reply': reply}

# @app.route('/my-endpoint', methods=['POST'])
# def my_endpoint():
#     # Call the Python function you want to trigger here
#     my_function()
#     return '', 204

# def my_function():
#     print("testing")
#     return None