'use strict'

const co = require('co')
const amqp = require('amqplib')

class Consumer {

	constructor(options) {
		options = options || {}
		this.isReady = amqp.connect(options.url).then(connect => {
			this.connect = connect
			return this.connect.createChannel()
		}).then(channel => {
			this.channel = channel
		})
	}

	close() {
		return this.channel.close().then(() => this.connect.close())
	}
}

Consumer.prototype.consume = co.wrap(function*(exchange, queue, process) {
	yield this.isReady
	yield this.channel.assertExchange(exchange, 'fanout').catch(() => {})
	yield this.channel.assertQueue(queue).catch(() => {})
	yield this.channel.bindQueue(queue, exchange, '').catch(() => {})
	yield this.channel.consume(queue, (message) => process(message.content.toString()), {
		noAck: true
	}).catch(() => {})
})

module.exports = Consumer
