# give-gpt-prompts

### Introduction ###
This is a simple html UI that takes prompts from the user, and uses the gpt-4 model from openAI to generate a response.
###

### How to use ###
To get a response, the user can enter prompts into "Prompt", then click on the "Go" button.

The user can also enter source text if they choose to, the prompt will look at the source text to get context of what the user wants, and generate a response where both source text and prompts are considered.

If the user clicks on the "Go" button without entering a response, an alert will be displayed to tell the user that prompts are required.

User can also click on Extract Key Terms to get a list of Key Terms in the source text.
###

### Troubleshoot ###
Q: How to start the server from scratch?
A: Launch Terminal, and navigate to the folder give-gpt-prompts
   Set the following environment variables:
   $env:FLASK_RUN_HOST = "0.0.0.0"
   $env:FLASK_RUN_PORT = "5277"
   $env:FLASK_APP = "server.py"
   $host.UI.RawUI.WindowTitle = "Prompt Tool"

   Then type:
   flask run

Q: How to restart the server?
A: In terminal, if the server is already running, `ctrl+c` to shurt the server, then type `flask run` to start it again.

Q: After typing flask run, I get this following error:
Could not locate a Flask application. Use the 'flask --app' option, 'FLASK_APP' environment variable, or a 'wsgi.py' or 'app.py' file in the current directory.
A: The server was named server.py, we need to set the environment variable by typing `$env:FLASK_APP = "server.py"`

Q: I keep getting the error saying GPT model is overloaded.
A: Usually this will resolve itself, but if this goes on for over one or two minutes, then most likely there is something wrong with the API key, look for the line in server.py that says `openai.api_key`, and change to a new key and try again, if unsure how to get new key, please contact Ken.
###
