import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai';
import Promise from '../src/promise'

chai.use(sinonChai)
const assert = chai.assert

describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })
  it("new Promise 如果接受不是一个函数就报错", () => {
    assert.throw(() => {
      //@ts-ignore
      new Promise()
    })
    assert.throw(() => {
      //@ts-ignore
      new Promise(1)
    })
  })
  it("new Promise(fn) 会生成一个对象,对象有 then 方法", () => {
    const promise = new Promise(() => {})
    assert.isFunction(promise.then)
  })
  it("new Promise(fn) 中的 fn 立即执行", () => {
    const fn = sinon.fake()
    const promise = new Promise(fn)
    // @ts-ignore
    assert(fn.called)
  })
  it("new Promise(fn) 中的 fn 执行的时候接受 resolve 和 reject 两个函数", (done) => {
    const promise = new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  })
  it("promise.then(success) 中的 success 会在 resolve 被调用的时候执行", (done) => {
    const success = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      resolve()
      setTimeout(() => {
        assert.isTrue(success.called)
        done()
      })
    })
    // @ts-ignore
    promise.then(success)
  })
})

