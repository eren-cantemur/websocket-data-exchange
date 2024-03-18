const WebSocket = require("ws");
const fs = require('fs');
const path = require('path');

const server = new WebSocket.Server({ port: 8080 });

console.log("Server has started on port 8080...");

server.on("connection", socket => {
    console.log("A client has connected.");

    socket.on("message", message => {
        const data = JSON.parse(message);
        const fileName = `${data.userName.replace(/\s+/g, '_')}.json`;
        const filePath = path.join(__dirname, "server-files", fileName);

        if (data.type === "upload") {
            fs.writeFileSync(filePath, message);
            console.log(`Uploaded file saved: ${fileName}`);
        } else if (data.type === "download") {
            if (fs.existsSync(filePath)) {
                let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                // Adjust the timestamp by one day
                let timestamp = new Date(content.timestamp);
                timestamp.setDate(timestamp.getDate() + 1);
                content.timestamp = timestamp.toDateString();
                content.type = undefined

                // Update the file with the new timestamp
                fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
                console.log(`Timestamp updated for: ${fileName}`);

                // Send the updated content back to the client
                socket.send(JSON.stringify(content));
                console.log(`File sent to client: ${fileName}`);
            } else {
                console.log(`File not found for download request: ${fileName}`);
            }
        }
    });

    socket.on("close", () => {
        console.log("A client has disconnected.");
    });
});
