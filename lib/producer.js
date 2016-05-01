'use strict'

const co = require('co')

class Producer extends require('./base') {

	constructor(options) {
		super(options)
	}

}

Producer.prototype.publish = co.wrap(function*(exchange, msg) {
	exchange = this.getNames(exchange)
	yield this.isReady
	yield this.channel.assertExchange(exchange, 'fanout')
	return this.channel.publish(exchange, '', new Buffer(JSON.stringify(msg)))
})

module.exports = Producer
