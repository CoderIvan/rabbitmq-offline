'use strict'

const co = require('co')

class Consumer {

	constructor(channel) {
		this.channel = channel
	}

	close() {
		return this.channel.close()
	}
}

Consumer.prototype.consume = co.wrap(function*(exchange, queue, process) {
	yield this.channel.assertExchange(exchange, 'fanout').catch(() => {})
	yield this.channel.assertQueue(queue).catch(() => {})
	yield this.channel.bindQueue(queue, exchange, '').catch(() => {})
	yield this.channel.consume(queue, (message) => process(message.content.toString()), {
		noAck: true
	}).catch(() => {})
})

module.exports = Consumer
