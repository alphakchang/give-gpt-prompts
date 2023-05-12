function myFunction() {
    var source_text = document.getElementById("source_text").value;
    var prompts = document.getElementById("prompts").value;
    // document.getElementById("grabbed_text").innerText = prompts + ": "+source_text; //can also try innerHTML
    var final_input = prompts + ": "+source_text;

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
    });
}
