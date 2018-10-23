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
			client.readyState === client.CLOSED
				? unsubscribe(client)
				: client.send(JSON.stringify(msg))
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