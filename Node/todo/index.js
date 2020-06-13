const {program} = require('commander')

program
.option('-x,--xxx', 'what the x')
program
.command('add')
.description('add a task')
.action((...args) => {
  const words = args.pop().join(' ')
  console.log(words)
})
program
.command('clear')
.description('clear all task')
.action((...args) => {
  const words = args.pop().join(' ')
  console.log(words)
})

program.parse(process.argv)

