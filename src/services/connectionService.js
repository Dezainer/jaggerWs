const TRACKER = 'tracker'
const OBSERVER = 'observer'

const canConnect = type => (
	type === TRACKER || type === OBSERVER
)

const getTypeFromUrl = url => (
	url.split('type=')[1]
)

export default { 
	canConnect,
	getTypeFromUrl,
	TRACKER,
	OBSERVER
}