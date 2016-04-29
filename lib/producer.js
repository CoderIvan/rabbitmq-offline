'use strict'

const co = require('co')
const amqp = require('amqplib')

class Producer {

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

Producer.prototype.publish = co.wrap(function*(exchange, msg) {
	yield this.isReady
	yield this.channel.assertExchange(exchange, 'fanout')
	return this.channel.publish(exchange, '', new Buffer(msg))
})

module.exports = Producer
