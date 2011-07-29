function send(command) {
	var wsServerAddress = '127.0.0.1:8880';
	var ws;
    try {
		console.log("executing: " + command)
        ws = new WebSocket('ws://' + wsServerAddress + '?cmd=' + command);
    } catch (err) {
        console.log(err);
    }

    ws.onmessage = function(event) {
        console.log(event.data);
    };

    ws.onclose = function(){
        console.log("ws.onclose");
    }
}