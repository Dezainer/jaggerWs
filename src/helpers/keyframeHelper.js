import os from 'os'

export default function() {
	let result = ''

	this.add = function(str) {
		result += str
		return this
	}

	this.tab = function() {
		result += '\t'
		return this
	}

	this.jump = function() {
		result += os.EOL
		return this
	}

	this.get = function() {
		return result
	}
}