function read_input() {
    var sourceText = document.getElementById("sourceText").value;
    var promptText = document.getElementById("promptText").value;
    if (promptText.trim() === "") {
        document.getElementById("result").innerHTML = "Please enter prompts for this to work.";
    } else {
        loading_on();
        if (sourceText.trim() === "") {
            var final_input = promptText;
        } else {
            var final_input = promptText + ": "+sourceText;
        }
        runGPT(final_input);
    }
}

function runGPT(final_input) {
    fetch('/gpt', {
        method: 'POST',
        body: JSON.stringify({'final_input': final_input}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerHTML = data.reply;
    })
    .then(() => {
        loading_off();
        goNextPage();
    })
}

function loading_on() {
    var div = document.getElementById('loading_display');
    div.style.display = 'inline';
}

function loading_off() {
    var div = document.getElementById('loading_display');
    div.style.display = 'none';
}

function goNextPage() {
    window.ws.goNext()
}