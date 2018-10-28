const GRAVITY = 9.80665

const filter = (data, history) => {
	if(data.length == 0) return

	let orientation = roundPoint(getPropAverage(getPropFromData(data, 'orientation'), 'orientation')),
		acceleration = roundPoint(getPropAverage(getPropFromData(data, 'acceleration'), 'acceleration'))

	console.log(acceleration)
	console.log(orientation)

	return { acceleration, orientation }
}

const getPropFromData = (data, prop) => (
	data.map(item => item[prop])
)

const getPropAverage = (data, prop) => ({
	x: getAverageOfProperty(data, 'x'),
	y: getAverageOfProperty(data, 'y'),
	z: getAverageOfProperty(data, 'z')
})

const getAverageOfProperty = (data, key) => (
	data.reduce((acc, current) => acc + current[key], 0) / data.length
)

const roundPoint = point => ({
	x: point.x.toFixed(2),
	y: point.y.toFixed(2),
	z: point.z.toFixed(2)
})

export default { filter }