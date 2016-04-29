'use strict'

let Producer = require('../').Producer
let producer = new Producer()

setInterval(() => {
	let content = new Date().toString()
	producer.publish('Test', content)
	console.log('Send: %s', content)
}, 10 * 1000)
