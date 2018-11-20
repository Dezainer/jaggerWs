import fse from 'fs-extra'
import KeyframeService from './keyframeService'

const exportTracking = tracking => (
	Promise.all(Object.keys(tracking).map(key => {
		let path = `./exports/${ +new Date() }/${ key }.txt`,
			keyframes = KeyframeService.makeKeyframes(
				tracking[key].map(frame => frame.position), 
				tracking[key].map(frame => frame.orientation)
			)

		return fse.outputFile(path, keyframes)
	}))
)

export default { exportTracking }