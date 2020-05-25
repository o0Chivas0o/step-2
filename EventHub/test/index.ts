import EventHub from '../src';

const eventHub = new EventHub()

console.assert(eventHub instanceof Object, "eventHub 是个对象")

// on emit

let called = false
eventHub.on('xxx', (data) => {
    called = true
    console.log('called:' + called)
    console.assert(data === 'yyy')
})

eventHub.emit('xxx', 'yyy')

const eventHub2 = new EventHub()
let called2 = false
const fn1 = () => {called2 = true}
eventHub.on('yyy', fn1)
eventHub.off('yyy', fn1)
eventHub.emit('yyy')
setTimeout(() => {
    console.log(called2);
}, 1000)
