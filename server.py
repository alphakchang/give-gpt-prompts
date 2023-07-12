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
             "content": "You are a GPT-4 assistant who will be helping employees from Alpha CRC, a company that specializes in localization, started in 1987."},
            {"role": "user",
             "content": request.json["final_input"]}
        ],
        temperature=0.5,
        # top_p=0.5,
    )
    reply = completion.choices[0].message.content
    return {'reply': reply}
