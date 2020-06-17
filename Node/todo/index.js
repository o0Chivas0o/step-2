const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')

module.exports.add = (title) => {
  // 读取之前的任务
  fs.readFile(dbPath, {flag: 'a+'}, (error, data) => {
    if (error) {console.log(error)} else {
      let list
      try {
        list = JSON.parse(data.toString())
        console.log(list)
      }
      catch (error2) {
        list = []
      }
      console.log(list)
      const task = {
        title,
        done: false
      }
      list.push(task)
      console.log(list)
      const string = JSON.stringify(list)
      fs.writeFile(dbPath, string + '\n', (error3) => {
        if (error3) {console.log(error3)}
      })
    }
  })
  // 往里面添加一个 title 任务
  // 存储任务到文件
}
