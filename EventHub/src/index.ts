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

    emit(eventName, data?) {
        // 把  this.cache[eventName] 数组 里面的 fn 全部依次调用

        // 代码优化
        // let array = this.cache[eventName]
        // if (array === undefined) {
        //     array = []
        // }
        // array.forEach(fn => {
        //     fn()
        // })

        (this.cache[eventName] || []).forEach(fn => fn(data))
    }

    off(eventName, fn) {
        // 把  this.cache[eventName] 数组删除
        this.cache[eventName] = this.cache[eventName] || []
        let index
        for (let i = 0; i < this.cache[eventName].length; i++) {
            if (this.cache[eventName][i] === fn) {
                index = i
                break
            }
        }
        if (index === undefined) {
            return
        } else {
            this.cache[eventName].splice(index, 1)
        }
    }
}

export default EventHub
