'use strict'

let options = {
	namespace: 'test.offline'
}
let Producer = require('../').Producer
let producer = new Producer(options)

setInterval(() => {
	let content = new Date().toString()
	producer.publish('Test', content)
	console.log('Send: %s', content)
}, 10 * 1000)
