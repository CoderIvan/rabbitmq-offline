'use strict'

const amqp = require('amqplib')

class Base {

	constructor(options) {
		this.url = options && options.url
		this.namespace = options && options.namespace

		this.isReady = amqp.connect(this.url).then(connect => {
			this.connect = connect
			return this.connect.createChannel()
		}).then(channel => {
			this.channel = channel
		})
	}

	getNames() {
		return this.namespace ? [this.namespace, ...arguments].join('.') : Array.prototype.join.call(arguments, '.')
	}

	close() {
		return this.channel.close().then(() => this.connect.close())
	}
}

module.exports = Base
