export default () => {
	let clients = [],
		onAllDisconnectedCallback

	const subscribe = client => {
		clients.push(client)
		client.on('close', () => unsubscribe(client))
	}

	const unsubscribe = clientToDisconnect => {
		clients = clients.filter(client => client != clientToDisconnect)
		
		clients.length == 0 && onAllDisconnectedCallback && 
			onAllDisconnectedCallback()
	}

	const broadcast = msg => {
		clients.forEach(client => {
			client.readyState === client.OPEN &&
				client.send(JSON.stringify(msg))
				
			client.readyState === client.CLOSED || client.readyState === client.CLOSING &&
				unsubscribe(client)
		})
	}

	const onAllDisconnected = callback => {
		onAllDisconnectedCallback = callback
	}

	return {
		subscribe,
		broadcast,
		onAllDisconnected
	}
}