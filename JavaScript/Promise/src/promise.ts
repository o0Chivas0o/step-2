class Promise2 {
  succeed = null
  fail = null
  state = 'pending'

  resolve(result) {
    this.state = 'fullfilled'
    setTimeout(() => {
      if (typeof this.succeed === 'function') {
        this.succeed(result)
      }
    }, 0)
  }
  reject(reason) {
    this.state = 'rejected'
    setTimeout(() => {
      if (typeof this.fail === 'function') {
        this.fail(reason)
      }
    }, 0)
  }
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error("我只接受函数")
    }
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  then(succeed?, fail?) {
    if (typeof succeed === 'function') {
      this.succeed = succeed
    }
    if (typeof fail === 'function') {
      this.fail = fail
    }
  }
}

export default Promise2
