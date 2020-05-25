const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const assert = chai.assert
const DeepClone = require('../src/index')

describe('DeepClone', () => {
  it('是一个函数', () => {
    assert.isFunction(DeepClone)
  })
  
  it('能够复制基本类型 number', () => {
    const n = 123
    const n2 = DeepClone(n)
    assert(n === n2)
  })
  
  it('能够复制基本类型 string', () => {
    const s = '123'
    const s2 = DeepClone(s)
    assert(s === s2)
  })
  
  it('能够复制基本类型 boolean', () => {
    const b = true
    const b2 = DeepClone(b)
    assert(b === b2)
  })
  
  it('能够复制基本类型 undefined', () => {
    const u = undefined
    const u2 = DeepClone(u)
    assert(u === u2)
  })
  
  it('能够复制基本类型 null', () => {
    const empty = null
    const empty2 = DeepClone(empty)
    assert(empty === empty2)
  })
  
  it('能够复制基本类型 symbol', () => {
    const sym = Symbol()
    const sym2 = DeepClone(sym)
    assert(sym === sym2)
  })
  
  describe('对象', () => {
    it('能够复制普通对象', () => {
      const a = {name: 'lzy', child: {name: 'junior lzy'}}
      const a2 = DeepClone(a)
      assert(a !== a2)
      assert(a.name === a2.name)
      assert(a.child !== a2.child)
      assert(a.child.name === a2.child.name)
    })
    
    it('能够复制数组对象', () => {
      const a = [[11, 12], [21, 22], [31, 32]]
      const a2 = DeepClone(a)
      assert(a !== a2)
      assert(a[0] !== a2[0])
      assert(a[1] !== a2[1])
      assert(a[2] !== a2[2])
      assert.deepEqual(a, a2)
    })
    
    it('能够复制函数对象', () => {
      const a = function (x, y) {return x + y}
      a.xxx = {yyy: {zzz: 1}}
      const a2 = DeepClone(a)
      assert(a !== a2)
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx !== a2.xxx)
      assert(a(1, 2) === a2(1, 2))
    })
    
    it('环也可以复制', () => {
      // const a = {name:'lzy' , self:a} // a.self === undefined 左查询 右查询 赋值后操作 等号右边先操作
      const a = {name: 'lzy'}
      a.self = a
      const a2 = DeepClone(a)
      assert(a !== a2)
      assert(a.name === a2.name)
      assert(a.self !== a2.self)
    })
    
    xit('不会爆栈', () => {
      const a = {child: null}
      let b = a
      for (let i = 0; i < 20000; i++) {
        b.child = {
          child: null
        }
        b = b.child
      }
      const a2 = DeepClone(a)
      assert(a !== a2)
      assert(a.child !== a2.child)
    })
    
    it('可以复制正则表达式', () => {
      //   const a = /hi\d+/gi;
      const a = new RegExp('hi\\d+', 'gi')
      a.xxx = {yyy: {zzz: 1}}
      const a2 = DeepClone(a)
      assert(a.source === a2.source)
      assert(a.flags === a2.flags)
      assert(a !== a2)
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx !== a2.xxx)
    })
    
    it('可以复制日期', () => {
      //   const a = /hi\d+/gi;
      const a = new Date()
      a.xxx = {yyy: {zzz: 1}}
      const a2 = DeepClone(a)
      assert(a !== a2)
      assert(a.getTime() === a2.getTime())
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx !== a2.xxx)
    })
  })
})
