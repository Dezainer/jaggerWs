export default () => {
	let frameRate = 24,
		timeout,
		running = false,
		callback

	const setFrameRate = fps => {
		frameRate = fps
	}

	const onRepeat = toExecute => {
		callback = toExecute
	}

	const run = () => {	
		clearTimeout(timeout)

		timeout = setTimeout(() => {
			callback()
			running && run()
		}, 1000 / frameRate)
	}

	const start = () => {
		running = true
		run()
	}

	const stop = () => {
		running = false
		clearTimeout(timeout)
	}

	const isRunning = () => (
		running
	)

	return {
		start, 
		stop,
		setFrameRate,
		onRepeat,
		isRunning
	}
}