const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Ensure the directories for client files and downloads exist
const clientFilesPath = path.join(__dirname, "client-files");
const downloadsPath = path.join(__dirname, "downloads");
if (!fs.existsSync(clientFilesPath)) {
    fs.mkdirSync(clientFilesPath);
}
if (!fs.existsSync(downloadsPath)) {
    fs.mkdirSync(downloadsPath);
}

// Set up readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Please enter your details.");

// Prompt user for name and reason for taking the course
rl.question("User Name: ", (userName) => {
  rl.question("Reason for taking this course: ", (courseReason) => {
    // Prepare user data and file path
    const userData = { userName, courseReason, timestamp: new Date().toDateString() }; 
    const userJsonData = JSON.stringify(userData);
    const fileName = `${userName.replace(/\s+/g, "_")}.json`;
    const filePath = path.join(clientFilesPath, fileName);

    // Write user data to file
    fs.writeFileSync(filePath, userJsonData);
    console.log(`User data saved to ${filePath}`);

    // Connect to WebSocket server and send user data
    const socket = new WebSocket("ws://localhost:8080");
    socket.on("open", () => {
      console.log("Connected to the server.");
      socket.send(JSON.stringify({...userData, type: "upload"})); // Upload
      console.log("User data sent to server.");

      // Request download after a short delay
      setTimeout(() => {
        const downloadRequest = JSON.stringify({ type: "download", userName });
        socket.send(downloadRequest);
        console.log("Requested data download from server.");
      }, 5000); // Modify delay as needed
    });

    socket.on("message", (message) => {
      // Save the file received from server for comparison
      const downloadFileName = `downloaded_${fileName}`;
      const downloadFilePath = path.join(downloadsPath, downloadFileName);
      fs.writeFileSync(downloadFilePath, message);
      console.log(`Downloaded data saved to ${downloadFilePath}`);
    });

    // End input session
    rl.close();
  });
});
