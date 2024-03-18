# WebSocket Data Exchange System

This project consists of a simple Node.js application that demonstrates data exchange between a client and a server using WebSockets. The system allows clients to upload their information, including a user name and a reason for taking a course, to the server. The server stores this information and, upon request, sends back the data with the timestamp adjusted to one day later.

[Short video to demonstrate](https://youtu.be/C_15iWfBe90)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js installed on your local machine.
- Basic knowledge of JavaScript and Node.js.

### Installing

Follow these steps to get a development environment running:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/eren-cantemur/websocket-data-exchange
```

2. Navigate to the project directory:

```bash
cd websocket-data-exchange
```

3. Install the necessary packages:

```bash
npm install
```

### Usage

The project consists of two main components: a server and a client.

#### Starting the Server

Navigate to the server directory and run the server script:

```bash
node server.js
```

The server will start listening for connections on port 8080.

#### Running the Client

In a new terminal window, navigate to the client directory and run the client script:

```bash
node client.js
```

Follow the on-screen prompts to enter your user name and reason for taking the course. The client will then send this data to the server, wait for a short period, and request the data back from the server.

### Files and Directories

- `server.js`: The server application script.
- `client.js`: The client application script.
- `client-files`: Directory where client data is stored before sending to the server.
- `server-files`: Directory where the server stores received data.
- `downloads`: Directory where clients save the data received back from the server.

### Authors

- **Mücahit Eren Cantemür** - _150180091_
