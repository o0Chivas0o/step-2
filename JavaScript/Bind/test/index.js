const bind = require('../src')

test1('fn.bind 能用')
test2('this 绑定成功')
test3('this, p1, p2 绑定成功')
test4('this, p1 绑定成功, 后传 p2 调用成功')
test5('new 的时候绑定了 p1,p2')
test6('new 的时候绑定了 p1,p2 , 并且 fn 有 prototype.sayHi')
test7('不用 new 但是用类似对象')

function test1 (message) {
  console.log(message)
  Function.prototype.bind2 = bind
  console.assert(Function.prototype.bind2 !== undefined)
}

function test2 (message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn1 = function () {
    return this
  }
  const newFn1 = fn1.bind2({name: 'lzy'})
  console.assert(newFn1().name === 'lzy')
}

function test3 (message) {
  console.log(message)
  Function.prototype.bind2 = bind
  
  const fn2 = function (p1, p2) {
    return [this, p1, p2]
  }
  
  const newFn2 = fn2.bind2({name: 'lzy'}, 123, 456)
  console.assert(newFn2()[0].name === 'lzy', 'this')
  console.assert(newFn2()[1] === 123, 'p1')
  console.assert(newFn2()[2] === 456, 'p2')
}

function test4 (message) {
  console.log(message)
  Function.prototype.bind2 = bind
  
  const fn2 = function (p1, p2) {
    return [this, p1, p2]
  }
  const anotherFn2 = fn2.bind2({name: 'lzy'}, 123)
  console.assert(anotherFn2(245)[0].name === 'lzy')
  console.assert(anotherFn2(245)[1] === 123)
  console.assert(anotherFn2(245)[2] === 245, 'xxx')
}

function test5 (message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  const fn2 = fn.bind(undefined, 'x', 'y')
  const object = new fn2()
  console.assert(object === 'x', 'x')
  console.assert(object === 'y', 'y')
}

function test6 (message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  fn.prototype.sayHi = function () {}
  const fn2 = fn.bind(undefined, 'x', 'y')
  const object = new fn2()
  console.assert(object === 'x', 'x')
  console.assert(object === 'y', 'y')
  // console.assert(object.__proto__ === fn.prototype)
  console.assert(fn.prototype.isPrototypeOf(object))
  console.assert(typeof object.sayHi === 'function')
}

function test7 (message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  fn.prototype.sayHi = function () {}
  const object1 = new fn('a', 'b')
  const fn2 = fn.bind(object1, 'x', 'y')
  const object = fn2()
  console.assert(object === undefined, 'x')
  console.assert(object.p1 === 'x', 'xx')
  console.assert(object.p2 === 'y', 'y')
}
