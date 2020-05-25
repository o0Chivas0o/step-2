const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const assert = chai.assert
const DeepClone = require('../src/index')

describe('DeepClone', () => {
  it('是一个函数', () => {
    assert.isFunction(DeepClone)
  })
})
