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
  it("promise.then(null,fail) 中的 fail 会在 reject 被调用的时候执行", (done) => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject()
      setTimeout(() => {
        assert(promise.state = 'reject')
        assert.isTrue(fail.called)
        done()
      })
    })
    // @ts-ignore
    promise.then(null, fail)
  })
  it("2.2.1 onFulfilled和onRejected都是可选的参数", () => {
    const promise = new Promise((resolve) => {
      resolve()
    })
    promise.then(false, null)
  })
  it("2.2.2 如果onFulfilled是函数", (done) => {
    const succeed = sinon.fake()
    const promise = new Promise((resolve) => {
      assert.isFalse(succeed.called)
      resolve(233)
      resolve(2333)
      setTimeout(() => {
        assert(promise.state = 'fullfilled')
        assert.isTrue(succeed.calledOnce)
        assert(succeed.calledWith(233))
        done()
      }, 0)
    })
    promise.then(succeed)
  })
  it("2.2.3 如果onRejected是函数", (done) => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject(233)
      reject(2333)
      setTimeout(() => {
        assert(promise.state = 'rejected')
        assert.isTrue(fail.calledOnce)
        assert(fail.calledWith(233))
        done()
      }, 0)
    })
    promise.then(null, fail)
  })
  it("2.2.4 在我的代码执行完毕之前, 不得调用 then 后面的两个函数", (done) => {
    const succeed = sinon.fake()
    const promise = new Promise(resolve => {
      resolve()
    })
    promise.then(succeed)
    assert.isFalse(succeed.called)
    setTimeout(() => {
      assert.isTrue(succeed.called)
      done()
    }, 0)
  })
  it("2.2.4 失败回调", (done) => {
    const fn = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      reject()
    })
    promise.then(null, fn)
    assert.isFalse(fn.called)
    setTimeout(() => {
      assert.isTrue(fn.called)
      done()
    }, 0)
  })
  it("2.2.5 onFulfilled和onRejected必须被当做函数调用", (done) => {
    const promise = new Promise(resolve => {
      resolve()
    })
    promise.then(function () {
      "use strict"
      assert(this === null)
      done()
    })
  })
  it("2.2.6.1 promise 的 then 可以链式调用多次", (done) => {
    const promise = new Promise(resolve => {
      resolve()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(callbacks[0])
    promise.then(callbacks[1])
    promise.then(callbacks[2])
    setTimeout(() => {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))
      done()
    }, 0)
  })
  it("2.2.6.2 reject promise 的 then 可以链式调用多次", (done) => {
    const promise = new Promise((resolve, reject) => {
      reject()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(null, callbacks[0])
    promise.then(null, callbacks[1])
    promise.then(null, callbacks[2])
    setTimeout(() => {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))
      done()
    }, 0)
  })
  it("2.2.7 then必须返回一个promise", () => {
    const promise = new Promise(resolve => {
      resolve()
    })
    const promise2 = promise.then(() => {}, () => {})
    // @ts-ignore
    assert(promise2 instanceof Promise)
  })
  it('2.2.7.1 如果onFulfilled或onRejected返回一个值x, 运行 [[Resolve]](promise2,x)', () => {
    const promise1 = new Promise(resolve => resolve())
    promise1
        .then(() => '成功')
        .then(result => {
          assert.equal(result, '成功')
        })
  })
  it('2.2.7.2 x 是一个 Promise', done => {
    const promise1 = new Promise(resolve => resolve())
    const fn = sinon.fake()
    const promise2 = promise1.then(() => new Promise(resolve => resolve()), () => {})
    promise2.then(fn)
    setTimeout(() => {
      assert(fn.called)
      done()
    }, 10)
  })
})

