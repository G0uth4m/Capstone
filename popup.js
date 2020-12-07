let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.body.style.backgroundColor = "' + color + '";'});
        sendCurrentUrlToServer(tabs[0]);
    });
};

function sendCurrentUrlToServer(tab) {
    var url = "http://127.0.0.1:5000/api/v1/ip/url";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var json = JSON.stringify({"url": tab.url});
    xhr.send(json);
}