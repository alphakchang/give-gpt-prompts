# give-gpt-prompts

### Introduction ###
This is a simple html UI that takes prompts from the user, and uses the gpt-3.5-turbo model from openAI to generate a response.
###

### How to use ###
To get a response, the user can enter prompts into the "Prompts" textarea, then click on the "Go" button.

The user can also enter source text if they choose to, the prompt will look at the source text to get context of what the user wants, and generate a response where both source text and prompts are considered.

If the user clicks on the "Go" button without entering a response, an alert will be displayed to tell the user that prompts are required.
###

### Troubleshoot ###
Q: How to restart the server?
A: In terminal, if the server is already running, `ctrl+c` to shurt the server, then type `flask run` to start it again.

Q: After typing flask run, I get this following error:
Could not locate a Flask application. Use the 'flask --app' option, 'FLASK_APP' environment variable, or a 'wsgi.py' or 'app.py' file in the current directory.
A: The server was named server.py, we need to set the environment variable by typing `$env:FLASK_APP = "server.py"`

Q: The page keeps loading after I click "Go", and nothing happens.
A: Most likely something wrong with the API key, look for the line in server.py that says `openai.api_key`, and change to a new key and try again.
###