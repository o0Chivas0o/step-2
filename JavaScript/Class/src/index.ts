// Class(类)
// 1.声明对象的自身属性(非函数)
// 2.声明对象的共有属性
// 3.声明对象的自身函数
// 4.声明类的自身属性(可以是函数)

// 继承
//
//
//

class EventEmitter {
  constructor() {}
  cache: Array<string> = []
  on(): void {}
  off(): void {}
  emit(): void {}
}

class Person extends EventEmitter {
  constructor(public name: string, public age: number) {super()}
  sayHi(): void {}
}

class Newspaper extends EventEmitter {
  constructor() {super();}
  // 多态 子类 on 有自身的状态
  on() {
    console.log('xxx')
  }
}
