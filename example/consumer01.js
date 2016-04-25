'use strict'

let Factory = require('../')
let factory = new Factory()

let array = [
	['01', 'DEFAULT'],
	['02', 'PUSH'],
	['03', 'PUSH'],
	['04', 'LOCATION'],
	['05', 'LOCATION'],
	['06', 'LOCATION']
]

factory.createConsumer().then(consumer => {
	array.forEach(entry => {
		consumer.consume('Test', entry[1], message => {
			console.log('Consumer %s : %s : %s', entry[0], entry[1], message)
		})
	})
})
