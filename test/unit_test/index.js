'use strict'

const chai = require('chai')
const expect = chai.expect
const bluebird = require('bluebird')

const Producer = require('../../').Producer
const Consumer = require('../../').Consumer

describe('Offline', () => {

	it('Producer init', (done) => {
		bluebird.coroutine(function*() {
			let producer = new Producer()
			yield producer.publish('Test01', 'Hello World')
			yield producer.close()
		})().then(() => {}).then(done).catch(done)
	})

	it('Consumer init', (done) => {
		bluebird.coroutine(function*() {
			let consumer = new Consumer()
			yield consumer.consume('Test01', 'Block_01', () => {})
			yield consumer.close()
		})().then(() => {}).then(done).catch(done)
	})

	it('Producer && Consumer', (done) => {
		bluebird.coroutine(function*() {
			let producer = new Producer()
			let consumer = new Consumer()
			let content = 'Hello World'

			yield consumer.consume('Test02', 'Block_02', (message) => {
				expect(message).eql(content)
				done()
			})
			yield producer.publish('Test02', content)

			yield producer.close()
			yield consumer.close()
		})().catch(done)
	})
})
