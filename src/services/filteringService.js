const filter = (data, history) => {
	if(data.length == 0) return

	let orientation = roundPoint(getAveragePoint(getPropFromData(data, 'orientation'))),
		acceleration = roundPoint(getAveragePoint(getPropFromData(data, 'acceleration')))

	console.log(acceleration)
	console.log(orientation)

	return { acceleration, orientation }
}

const getPropFromData = (data, prop) => (
	data.map(item => item[prop])
)

const getAverageOfProperty = (data, key) => (
	data.reduce((acc, current) => acc + current[key], 0) / data.length
)

const getAveragePoint = data => {
	let point = {}

	Object.keys(data[0]).map(key => {
		point[key] = getAverageOfProperty(data, key)
	})

	return point
}

const roundPoint = point => {
	let round = {}

	Object.keys(point).map(key => {
		round[key] = point[key].toFixed(2)
	})

	return round
}

export default { filter }