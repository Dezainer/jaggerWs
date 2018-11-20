import Keyframes from '../helpers/keyframeHelper'

const makeKeyframes = (positions, rotations) => {
	let result = new Keyframes()

	//Header
	result.add('Adobe After Effects 8.0 Keyframe Data').jump()
		.jump()
		.tab().add('Units Per Second').tab().add('23.976').jump()
		.tab().add('Source Width').tab().add('100').jump()
		.tab().add('Source Height').tab().add('100').jump()
		.tab().add('Source Pixel Aspect Ratio').tab().add('1').jump()
		.tab().add('Comp Pixel Aspect Ratio').tab().add('1').jump()
		.jump()

	//X Rotation
	result.add('Transform').tab().add('X Rotation').jump()
		.tab().add('Frame').tab().add('degrees').jump()

	rotations.forEach((keyFrame, frame) => {
		result.tab().add(frame).tab().add(keyFrame.x).jump()
	})

	result.jump()

	//Y Rotation
	result.add('Transform').tab().add('Y Rotation').jump()
		.tab().add('Frame').tab().add('degrees').jump()

	rotations.forEach((keyFrame, frame) => {
		result.tab().add(frame).tab().add(keyFrame.y).jump()
	})

	result.jump()

	//Position
	result.add('Transform').tab().add('Position').jump()
		.tab().add('Frame').tab().add('X pixels').tab().add('Y pixels').tab().add('Z pixels').jump()

	positions.forEach((keyFrame, frame) => {
		result.tab().add(frame).tab().add(keyFrame.x).tab().add(keyFrame.y).tab().add(keyFrame.z).jump()
	})

	result.jump()

	//Z Rotation
	result.add('Transform').tab().add('Rotation').jump()
		.tab().add('Frame').tab().add('degrees').jump()

	rotations.forEach((keyFrame, frame) => {
		result.tab().add(frame).tab().add(keyFrame.z).jump()
	})

	result.jump()

	//Footer
	result.jump().add('End of Keyframe Data')
	return result.get()
}

export default { makeKeyframes }