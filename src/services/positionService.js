const getPosition = (currentAcceleration, lastVelocity) => (
	getPositionFromAcceleration(currentAcceleration, 1000 / 24, lastVelocity)
)

const getPositionFromAcceleration = (a, t, v) => (
	((a * t) + v) * t
)

export default { getPosition }