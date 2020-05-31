var slice = Array.prototype.slice

function bind (asThis) {
  // this 就是函数
  var fn = this
  var args = slice.call(arguments, 1)
  if (typeof fn !== 'function') {
    throw new Error('bind 必须调用在函数上')
  }
  return function (args2) {
    var arg2 = slice.call(arguments, 0)
    return fn.apply(asThis, args.concat(arg2))
  }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
