const amqp = require('amqplib')
const _ = require('lodash')

const DEFAULT_OPTIONS = {
	url: undefined,
}

module.exports = class Base {

	constructor(options) {
		this.options = _.extend({}, DEFAULT_OPTIONS, options)

		this.isReady = (async () => {
			const connect = await amqp.connect(this.options.url)
			const channel = await connect.createChannel()

			this.connect = connect
			this.channel = channel
		})()
	}

	async close() {
		await this.channel.close()
		await this.connect.close()
	}
}
