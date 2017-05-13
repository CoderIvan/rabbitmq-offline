const { expect } = require('chai')

const { Producer, Consumer } = require('../../')

describe('Offline', () => {
	it('Producer init', async () => {
		const producer = new Producer()
		await producer.publish('Test01', 'Hello World')
		await producer.close()
	})

	it('Consumer init', async () => {
		const consumer = new Consumer()
		await consumer.consume('Test01', 'Block_01', () => {})
		await consumer.close()
	})

	it('Producer && Consumer', async () => {
		const producer = new Producer()
		const consumer = new Consumer()
		const content = 'Hello World'

		const p = new Promise((resolve) => {
			consumer.consume('Test02', 'Block_02', (message) => {
				expect(message).eql(content)
				resolve()
			})
		})

		await producer.publish('Test02', content)

		await p

		await producer.close()
		await consumer.close()
	})
})
