const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8082});

wss.on("connection", ws => {

    console.log("New client is connected");

    ws.on("message", data => {
            data = JSON.parse(data);
        
            console.log(`A client send the message: ${data}`);
        
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
    });

    ws.on("close", ()=> {
        console.log("A client has disconnected! ");
    })
});