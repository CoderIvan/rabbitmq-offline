const Base = require('./base')

module.exports = class Producer extends Base {

	async publish(exchangeName, msg) {
		await this.isReady
		await this.channel.assertExchange(exchangeName, 'fanout')
		await this.channel.publish(exchangeName, '', Buffer.from(JSON.stringify(msg)))
	}

}
