const tooltips = document.querySelectorAll('.tt')
        tooltips.forEach(t => {
            new bootstrap.Tooltip(t);
        })

document.getElementById('promptText').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        document.getElementById('goButton').click();
    }
});

// monitor if extractButton is clicked
document.getElementById('extractButton').addEventListener('click', function(event) {
    var button = document.getElementById("extractButton");
    button.disabled = true;
    const sourceText = getSourceText();
    if (sourceText.trim() === "") {
        showNoSourceAlert();
        button.disabled = false;
    }
    else {
        const extractPrompt = "Extract 10 or less keywords, add a number before each keyword: "
        const promptText = extractPrompt + sourceText;
        console.log(promptText);
        loading_on();
        getKeyTerms(promptText);
    }
});

// function to get text from sourceText
function getSourceText() {
    var sourceText = document.getElementById("sourceText").value;
    return sourceText;
}

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
        document.getElementById("promptOutput").innerHTML = data.reply;
    })
    .then(() => {
        loading_off();
        closeOverloadAlert();
        showPromptOutput();
        var button = document.getElementById("goButton");
        button.disabled = false;
    })
}

function getKeyTerms(sourceText) {
    fetch('/gpt', {
        method: 'POST',
        body: JSON.stringify({'final_input': sourceText}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            showOverloadAlert();
            getKeyTerms(sourceText);
        }
        return response.json();
    })
    .then(data => {
        newStr = data.reply.replace(/(\d+\.)/g, "<br/>$1"); // add line break before number
        document.getElementById("keyTerms").innerHTML = newStr;
    })
    .then(() => {
        loading_off();
        closeOverloadAlert();
        showKeyTerms();
        var button = document.getElementById("extractButton");
        button.disabled = false;
    })
}

function showKeyTerms() {
    var div = document.getElementById('keyTerms');
    div.style.display = 'block';
}

function showPromptOutput() {
    var div = document.getElementById('output');
    div.style.display = 'block';
    window.scrollTo(0, div.offsetTop);
}

function loading_on() {
    var div = document.getElementById('loading_display');
    div.style.display = 'inline';
}

function loading_off() {
    var div = document.getElementById('loading_display');
    div.style.display = 'none';
}

function closePromptAlert() {
    var alert = document.getElementById('prompt_alert');
    alert.style.display = 'none';
}

function showNoSourceAlert() {
    var alert = document.getElementById('no_source_alert');
    alert.style.display = 'block';
}

function closeNoSourceAlert() {
    var alert = document.getElementById('no_source_alert');
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