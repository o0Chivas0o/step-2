class EventHub {
    cache = {}
    // {
    //     '楚天都市报': [ fn1, fn2, fn3],
    //     '武汉晚报':[ fn1, fn2 , fn3]
    // }

    on(eventName, fn) {
        // 把 fn 推进 this.cache[eventName] 数组
        // eventName = 楚天 , fn

        // 代码优化
        // if (this.cache[eventName] === undefined) {
        //     this.cache[eventName] = []
        // }
        // const array = this.cache[eventName]
        // array.push(fn)

        this.cache[eventName] = this.cache[eventName] || []
        this.cache[eventName].push(fn)
    }

    emit(eventName) {
        // 把  this.cache[eventName] 数组 里面的 fn 全部依次调用

        // 代码优化
        // let array = this.cache[eventName]
        // if (array === undefined) {
        //     array = []
        // }
        // array.forEach(fn => {
        //     fn()
        // })

        (this.cache[eventName] || []).forEach(fn => fn())
    }
}

export default EventHub
