'use strict'

let Factory = require('../')

let factory = new Factory()

factory.createProducer().then(producer => {
	setInterval(() => {
		let content = new Date().toString()
		producer.publish('Test', content)
		console.log('Send: %s', content)
	}, 10 * 1000)
})
