// const curring = (fn, params = []) =>
//     (...arg) =>
//         arg.length + params.length === fn.length ?
//             fn(...arg, ...params) : curring(fn, [...params, ...arg])

const curring = (fn, params = []) => {
  return (arg) => {
    const newParams = params.concat(arg)
    if (newParams.length === fn.length) {
      return fn(...newParams)
    } else {
      return curring(fn, newParams)
    }
  }
}

const addTwo = (a, b) => a + b
const addThree = (a, b, c) => a + b + c
const addFour = (a, b, c, d) => a + b + c + d
const addFive = (a, b, c, d, e) => a + b + c + d + e

const newAddTwo = curring(addTwo)
const newAddThree = curring(addThree)
const newAddFour = curring(addFour)
const newAddFive = curring(addFive)

console.log(newAddTwo(1)(2)) // 3
console.log(newAddThree(1)(2)(3)) // 6
console.log(newAddFour(1)(2)(3)(4)) // 10
console.log(newAddFive(1)(2)(3)(4)(5)) // 10
