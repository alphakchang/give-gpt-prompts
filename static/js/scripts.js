document.getElementById('promptText').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        document.getElementById('goButton').click();
    }
});

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
function showTutorial1() {
    var tooltip = document.getElementById('myTooltip1');
    var nextButton = document.getElementById('nextButton1');
    tooltip.style.visibility = "visible"
    tooltip.style.opacity = "1";
    nextButton.style.visibility = "visible"
    nextButton.style.opacity = "1";
}

function showTutorial2() {
    var tooltip = document.getElementById('myTooltip1');
    var nextButton = document.getElementById('nextButton1');
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
    nextButton.style.visibility = "hidden";
    nextButton.style.opacity = "0";

    tooltip = document.getElementById('myTooltip2');
    nextButton = document.getElementById('nextButton2');
    tooltip.style.visibility = "visible"
    tooltip.style.opacity = "1";
    nextButton.style.visibility = "visible"
    nextButton.style.opacity = "1";
}

function closeTutorial() {
    var tooltip = document.getElementById('myTooltip2');
    var nextButton = document.getElementById('nextButton2');
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
    nextButton.style.visibility = "hidden";
    nextButton.style.opacity = "0";
}

/* End of tutorial */