from flask import Flask, render_template, request
import openai

openai.api_key = ""

app = Flask(__name__)

if __name__ == '__main__':
    app.run()

@app.route('/')
def index():
    return render_template('new_index.html')

@app.route('/gpt', methods=['POST'])
def gpt():
    completion = openai.ChatCompletion.create(
        model='gpt-4',
        messages=[
            {"role": "system",
             "content": "You are a GPT-4 assistant who will be helping employees from Alpha CRC, a company that specializes in localization, started in 1987. If asked to translate, you will give a very naturally fluent translation."},
            {"role": "user",
             "content": request.json["final_input"]}
        ],
        temperature=0.6,
        # top_p=0.5,
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