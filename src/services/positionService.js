const t = 1 / 24

const getDisplacement = (vi, a) => (
	vi * t + (a * (t * t) / 2)
)

const getFinalVelocity = (vi, a) => (
	(a * t) + vi
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