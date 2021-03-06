export default () => {
	let data = {}

	const add = (key, value) => {
		if(data[key] === undefined)
			data[key] = []

		data[key].push(value)
	}

	const get = key => (
		data[key] || []
	)

	const set = (key, value) => {
		data[key] = value
	}

	const clear = key => {
		data[key] = []
	}

	const getAll = () => (
		data
	)

	const reset = () => {
		data = {}
	}

	return {
		add,
		get,
		set,
		clear,
		getAll,
		reset
	}
}