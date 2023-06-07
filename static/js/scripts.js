function readInput() {
    var sourceText = document.getElementById("sourceText").value;
    var promptText = document.getElementById("promptText").value;
    if (promptText.trim() === "") {
        showPromptAlert();
    } else {
        closePromptAlert();
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
    .then(response => {
        if (!response.ok) {
            showOverloadAlert();
            readInput();
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("result").innerHTML = data.reply;
    })
    .then(() => {
        loading_off();
        closeOverloadAlert();
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

function closePromptAlert() {
    var alert = document.getElementById('prompt_alert');
    alert.style.display = 'none';
}

function showPromptAlert() {
    var alert = document.getElementById('prompt_alert');
    alert.style.display = 'block';
}

function closeOverloadAlert() {
    var alert = document.getElementById('overload_alert');
    alert.style.display = 'none';
}

function showOverloadAlert() {
    var alert = document.getElementById('overload_alert');
    alert.style.display = 'block';
}

/* Start of tutorial */
function showTutorial() {
    var tooltip = document.getElementById("myTooltip2");
    tooltip.style.display = "block";
}

/* End of tutorial */