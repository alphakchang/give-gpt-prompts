// create tooltips
const tooltips = document.querySelectorAll('.tt')
        tooltips.forEach(t => {
            new bootstrap.Tooltip(t);
        });

// Select the sourceText & promptText elements by their IDs
var sourceText = document.getElementById('sourceText');
var keyTerms = document.getElementById('keyTerms');

// Add the event listeners to the desired elements
addScrollListeners(sourceText);
addScrollListeners(keyTerms);

function addScrollListeners(div) {
    div.addEventListener('mouseover', function() {
        // highlight the div when the mouse is over it
        div.classList.toggle('hovered');

        // Add an event listener to the window for the scroll event
        window.addEventListener('wheel', preventScroll, {passive: false});
    });

    div.addEventListener('mouseout', function() {
        // remove the highlight when the mouse leaves the div
        div.classList.toggle('hovered');

        // Remove the event listener from the window when the mouse leaves the div
        window.removeEventListener('wheel', preventScroll, {passive: false});
    });

    div.addEventListener('wheel', allowScroll);
}

// This function will prevent the default scroll behavior
function preventScroll(e) {
    e.preventDefault();
}

// This function will stop the scroll event from bubbling up to the window
function allowScroll(e) {
    e.stopPropagation();
}


// function to get text from sourceText
function getSourceText() {
    return document.getElementById("sourceText").value;
}

// function to get text from promptText
function getPromptText() {
    return document.getElementById("promptText").value;
}

// monitor if user press Enter in promptText
document.getElementById('promptText').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        document.getElementById('goButton').click();
    }
});

// monitor if extractButton is clicked
document.getElementById('extractButton').addEventListener('click', function() {
    var button = document.getElementById("extractButton");
    button.disabled = true;
    const sourceText = getSourceText();
    if (sourceText.trim() === "") {
        showNoSourceAlert();
        button.disabled = false;
    }
    else {
        const extractPrompt = "Extract only important keywords, add a number before each keyword: "
        const promptText = extractPrompt + sourceText;
        console.log(promptText);
        loading_on();
        getKeyTerms(promptText);
    }
});

// monitor if goButton is clicked
document.getElementById('goButton').addEventListener('click', function() {
    readInput();
});


function readInput() {
    let sourceText = getSourceText();
    let promptText = getPromptText();
    if (promptText.trim() === "") {
        showPromptAlert();
    } else {
        closePromptAlert();
        let button = document.getElementById("goButton");
        button.disabled = true;
        loading_on();
        if (sourceText.trim() === "") {
            var final_input = promptText;
        } else {
            var final_input = promptText + ": "+sourceText;
        }
        getGPTAnswer(final_input);
    }
}

function getGPTAnswer(final_input) {
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
        newStr = data.reply.replace(/(\d+\.)/g, "\n$1"); // add line break before number
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