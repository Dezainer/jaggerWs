import quaternionToEuler from 'quaternion-to-euler'

const quaternionToDegrees = q => {
	let radians = quaternionToEuler([q.w, q.x, q.y, q.z])
	return {
		x: radiansToDegrees(radians[0]),
		y: radiansToDegrees(radians[1]),
		z: radiansToDegrees(radians[2])
	}
}

const radiansToDegrees = rad => (
	rad * (180 / Math.PI)
)

export default { quaternionToDegrees }