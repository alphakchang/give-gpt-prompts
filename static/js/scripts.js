function read_input() {
    var sourceText = document.getElementById("sourceText").value;
    var promptText = document.getElementById("promptText").value;
    if (promptText.trim() === "") {
        showAlert();
    } else {
        var button = document.getElementById("goButton");
        button.disabled = true;
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
        var button = document.getElementById("goButton");
        button.disabled = false;
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

function closeAlert() {
    var alert = document.getElementById('alert');
    alert.style.display = 'none';
}

function showAlert() {
    var alert = document.getElementById('alert');
    alert.style.display = 'block';
}