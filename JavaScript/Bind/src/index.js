var slice = Array.prototype.slice

function bind(asThis) {
  // this 就是函数
  var fn = this
  var args = slice.call(arguments, 1)
  if (typeof fn !== 'function') {
    throw new Error('bind 必须调用在函数上')
  }
  
  function resultFn(args2) {
    var arg2 = slice.call(arguments, 0)
    return fn.apply(this instanceof resultFn ? this : asThis, args.concat(arg2))
  }
  
  resultFn.prototype = fn.prototype
  return resultFn
}

function _bind(asThis, ...args) {
  // this 就是函数
  var fn = this
  
  function resultFn(...args2) {
    // resultFn.prototype.isPrototypeOf(this);
    return fn.call(this instanceof resultFn ? this : asThis, ...args, ...args2)
  }
  
  resultFn.prototype = fn.prototype
  return resultFn
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
