const Base = require('./base')

module.exports = class Consumer extends Base {

	async consume(exchange, queue, process) {
		await this.isReady
		await this.channel.assertExchange(exchange, 'fanout').catch(() => {})
		await this.channel.assertQueue(queue).catch(() => {})
		await this.channel.bindQueue(queue, exchange, '').catch(() => {})
		await this.channel.consume(queue, message => process(JSON.parse(message.content.toString())), {
			noAck: true,
		}).catch(() => {})
	}

}
