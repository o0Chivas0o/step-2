import EventHub from '../src';

const test1 = (message) => {
    const eventHub = new EventHub()
    console.assert(eventHub instanceof Object)
    console.log(message)
}
const test2 = (message) => {
    // on emit
    const eventHub = new EventHub()
    let called = false
    eventHub.on('xxx', (data) => {
        called = true
        console.assert(data === 'yyy')
    })

    eventHub.emit('xxx', 'yyy')
    setTimeout(() => {
        console.assert(called === true)
        console.log(message)
    }, 1000)
}
const test3 = (message) => {
    // on emit off
    const eventHub = new EventHub()
    let called = false
    const fn1 = () => {called = true}
    eventHub.on('yyy', fn1)
    eventHub.off('yyy', fn1)
    eventHub.emit('yyy')
    setTimeout(() => {
        console.assert(called === false);
        console.log(message)
    }, 1000)
}

test1('EventHub 可以创建对象')
test2('.on 之后  .emit 会触发 .on的函数')
test3('存在 .off 方法')
