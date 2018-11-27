import uuidv1 from 'uuid/v1'

import ConnectionService from '../services/connectionService'
import FilteringService from '../services/filteringService'
import PositionService from '../services/positionService'
import RotationService from '../services/rotationService'
import KeyframeService from '../services/keyframeService'
import ExportService from '../services/exportService'

import TimeoutHelper from '../helpers/timeoutHelper'
import StorageHelper from '../helpers/storageHelper'
import StreamHelper from '../helpers/streamHelper'

const trackers = new StreamHelper()
const observers = new StreamHelper()

const tracking = new StorageHelper()
const frames = new StorageHelper()

const velocities = new StorageHelper()
const accelerations = new StorageHelper()

const timeoutHelper = new TimeoutHelper()
let firstOrientation

trackers.onAllDisconnected(() => {
	stopStreaming()
	exportTracking()
})

const handleConnection = (url, ws) => {
	let type = ConnectionService.getTypeFromUrl(url)

	if(!ConnectionService.canConnect(type))
		throw new Error('Connection type does not exist')

	type === ConnectionService.TRACKER && handleTracker(ws)
	type === ConnectionService.OBSERVER && handleObserver(ws)
}

const handleTracker = tracker => {
	// const uuid = uuidv1()
	// const uuid = Object.keys(tracking.getAll()).length.toString();
	const uuid = "asd"
	trackers.subscribe(tracker)

	tracker.on('message', rawMsg => {
		let msg = JSON.parse(rawMsg)
		tracking.add(uuid, msg.data)

		startStreaming()
	})
}

const startStreaming = () => {
	if(timeoutHelper.isRunning()) return

	timeoutHelper.onRepeat(() => {
		let lastFrame = {}

		Object.keys(tracking.getAll()).map(key => {
			let filtered = FilteringService.filter(tracking.get(key), frames.get(key))
			if(!filtered) return
			
			if(!firstOrientation) firstOrientation = filtered.orientation

			lastFrame[key] = {
				orientation: RotationService.compensateInitialRotation(firstOrientation, filtered.orientation),
				acceleration: accelerations.get(key)[accelerations.get(key).length - 1],
				velocity: velocities.get(key)[velocities.get(key).length - 1],
				position: getPosition(key, filtered.acceleration)
			}

			tracking.clear(key)
		})	

		lastFrame && observers.broadcast(lastFrame)
		saveFrame(lastFrame)
	})

	timeoutHelper.start()
}

const getPosition = (key, acceleration) => {
	let displacement = {},
		finalVelocity = {},
		frameHistory = frames.get(key),
		initialPosition = frameHistory.length === 0 ? null : frameHistory[frameHistory.length - 1].position,
		vis = velocities.get(key),
		ais = accelerations.get(key),
		vi = vis.length === 0 ? { x: 0, y: 0, z: 0 } : vis[vis.length - 1],
		ai = ais.length === 0 ? { x: 0, y: 0, z: 0 } : ais[ais.length - 1]

	Object.keys(acceleration).map(axis => {
		finalVelocity[axis] = PositionService.integrateProperty(vi[axis], ai[axis], acceleration[axis])
		displacement[axis] = PositionService.integrateProperty(vi[axis], finalVelocity[axis])
	})

	velocities.add(key, finalVelocity)
	accelerations.add(key, acceleration)

	return PositionService.displacePosition(initialPosition, displacement)
}

const saveFrame = frame => {
	Object.keys(frame).map(key => {
		frames.add(key, frame[key])
	})
}

const stopStreaming = () => {
	timeoutHelper.stop()
}

const handleObserver = observer => {
	console.log('connected')
	observers.subscribe(observer)
}

const exportTracking = () => {
	Object.keys(frames.getAll()).map(key => {
		frames.set(key, frames.get(key).map(point => Object.assign(
			point,
			{ rotation: RotationService.quaternionToDegrees(point.orientation) }
		)))
	})

	ExportService.exportTracking(frames.getAll())
		.then(() => frames.reset())
		.catch(err => console.log(err))
}

export default { handleConnection }