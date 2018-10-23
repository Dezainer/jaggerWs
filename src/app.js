import WebSocket from 'ws'
import StreamController from './controllers/streamController'

const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', (ws, req) => {
	StreamController.handleConnection(req.url, ws)
})

console.log('Up and running!')