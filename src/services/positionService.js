const dt = 1 / 24

const getDisplacement = (vi, vf) => (
	((vi + vf) / 2) * dt
)

const getFinalVelocity = (ai, af) => (
	((ai + af) / 2) * dt
)

const displacePosition = (pi, s) => ({
	x: (pi ? pi.x : 0) + s.x,
	y: (pi ? pi.y : 0) + s.y,
	z: (pi ? pi.z : 0) + s.z
})

export default { 
	getDisplacement,
	getFinalVelocity,
	displacePosition
}