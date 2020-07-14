/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0'
  // 这里可以使用朴素的 99 乘法表来解决
  // [3, 2, 1]
  const array1 = num1.split('').map(item => item * 1).reverse()
  // [6, 5, 4]
  const array2 = num2.split('').map(item => item * 1).reverse()
  // 循环相乘，即让 123 分别与 6 5 4 相乘
  // array2 始终是长度最短的那个
  let result = array2.map(item => {
      let arr = []
      // 6
      array1.forEach(childItem => {
          // 3 2 1
          arr.push(childItem * item)
      })
      return processFinalAdd(arr)
  })
  console.log('result', result)
  return processFinalAdd(result)
}

// 处理最后的加
function processFinalAdd (array) {
    // [738, 615, 492] => [738, 6150, 49200]
    let result = array.map((item, index) => {
        item += ''
        for (let i = 0; i < index; i++) {
            item = (item + '0')
        }
        return item
    })
    // 这里不能这么简单的做加法，应该是使用 “两字符串相加的方式”
    return result.reduce((acc, cur) => addTwoString(acc, cur))
}

function addTwoString(acc, cur) {
  if (!acc) return cur
  let carry = 0
  const array = []
  for(let i = acc.length - 1, j = cur.length - 1; i >=0 || j >= 0 || carry !== 0; i--, j--) {
    const x = i < 0 ? 0 : (acc.charAt(i) - '0')
    const y = j < 0 ? 0 : (cur.charAt(j) - '0')
    let ret = x + y + carry
    array.push(ret % 10)
    carry = Math.floor(ret / 10)
  }
  return array.reverse().join('')
}

console.assert(multiply('2', '3') === '6')
console.assert(multiply('88', '99') === '8712')
console.assert(multiply('123', '456') === '56088')

console.assert(multiply('9', '98') === '882')
console.assert(multiply('9', '989') === '8901')
console.assert(multiply('9', '9898') === '89082')

console.assert(multiply('98', '98') === '9604')
console.assert(multiply('98', '989') === '96922')
console.assert(multiply('98', '9898') === '970004')

console.assert(multiply('98', '9') === '882')
console.assert(multiply('989', '9') === '8901')
console.assert(multiply('9898', '9') === '89082')

console.assert(multiply('123456789', '987654321') === "121932631112635269")

console.assert(multiply('9898', '0') === '0')
