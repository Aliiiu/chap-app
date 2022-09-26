import express from 'express';
const app = express();
const webSocketsServerPort = 3000;
const webSocketServer = require('websocket').server;
const http = require('http');
const cors = require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.use(cors);
const server = http.createServer(app);
server.listen(webSocketsServerPort, () => {
	console.log('listening on port 3000');
});

const wsServer = new webSocketServer({
	httpServer: server,
});

const broadcast = (data: any) => {
	wsServer.connections.forEach((client: any) => {
		client.sendUTF(data);
	});
};

wsServer.on('request', (request: any) => {
	const connection = request.accept(null, request.origin);
	console.log('connection accepted');

	connection.on('message', (message: any) => {
		const data = JSON.parse(message.utf8Data);
		if (message.type === 'utf8') {
			switch (data.type) {
				case 'send-message':
					broadcast(message.utf8Data);
					break;
			}
		}
	});
});
