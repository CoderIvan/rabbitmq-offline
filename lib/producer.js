'use strict'

const co = require('co')

class Producer {

	constructor(channel) {
		this.channel = channel
	}

	close() {
		return this.channel.close()
	}
}

Producer.prototype.publish = co.wrap(function*(exchange, msg) {
	yield this.channel.assertExchange(exchange, 'fanout')
	this.channel.publish(exchange, '', new Buffer(msg))
})

module.exports = Producer
