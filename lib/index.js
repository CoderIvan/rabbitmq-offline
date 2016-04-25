'use strict'

const amqp = require('amqplib')
const _ = require('lodash')

const Producer = require('./producer')
const Consumer = require('./consumer')

const default_options = {}

class Factory {

	constructor(options) {
		this.options = _.extend({}, default_options, options)
		this.isReady = amqp.connect(this.options.url).then((connect) => {
			this.connect = connect
		})
	}

	createProducer() {
		return this.isReady.then(() => this.connect.createChannel()).then((channel) => new Producer(channel, ...arguments))
	}

	createConsumer() {
		return this.isReady.then(() => this.connect.createChannel()).then((channel) => new Consumer(channel, ...arguments))
	}

	close() {
		return this.isReady.then(() => this.connect.close())
	}
}

module.exports = Factory
