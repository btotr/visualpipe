var sys = require('sys'),
http = require('http'),
url = require('url'),
exec = require('child_process').exec,
ws = require('./ws.js');

ws.createServer(function(websocket) {
    websocket.on('connect',
    function(resource) {
        var stream = exec(url.parse(resource, true).query.cmd);
        stream.stdout.on('data',
        function(data) {
            websocket.write(data);
        });

        stream.stdout.on('data',
        function(data) {
            websocket.write(data);
        });

        stream.addListener("exit",
        function(code) {
            websocket.write("Child process stopped with exit code: " + code);
        });

        var streamTimeout = setTimeout(function() {
            stream.kill();
        },
        20000);
    });
}).listen(8880, '127.0.0.1');