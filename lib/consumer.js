'use strict'

const co = require('co')

class Consumer extends require('./base') {

	constructor(options) {
		super(options)
	}

}

Consumer.prototype.consume = co.wrap(function*(exchange, queue, process) {
	queue = this.getNames(queue)
	exchange = this.getNames(exchange)
	yield this.isReady
	yield this.channel.assertExchange(exchange, 'fanout').catch(() => {})
	yield this.channel.assertQueue(queue).catch(() => {})
	yield this.channel.bindQueue(queue, exchange, '').catch(() => {})
	yield this.channel.consume(queue, (message) => process(JSON.parse(message.content.toString())), {
		noAck: true
	}).catch(() => {})
})

module.exports = Consumer
