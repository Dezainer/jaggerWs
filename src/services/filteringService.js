const filter = (data, history) => (
	data.length > 0 && {
		acceleration: data[0].acceleration,
		orientation: getOrientationAverage(data)
	}
)

const getOrientationAverage = data => ({
	x: getAverageOfProperty(getOrientationFromData(data), 'x'),
	y: getAverageOfProperty(getOrientationFromData(data), 'y'),
	z: getAverageOfProperty(getOrientationFromData(data), 'z')
})

const getOrientationFromData = data => (
	data.map(item => item.orientation)
)

const getAverageOfProperty = (data, key) => (
	data.reduce((acc, current) => acc + current[key], 0) / data.length
)

export default { filter }