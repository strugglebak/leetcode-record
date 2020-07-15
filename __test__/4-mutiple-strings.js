/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0'
  const result = [...(new Array(num1.length + num2.length))].map(() => 0)
  for(let i = num1.length - 1; i >= 0; i--) {
    const n1 = num1.charAt(i) * 1
    for (let j = num2.length - 1; j >= 0; j--) {
      const n2 = num2.charAt(j) * 1
      const sum = n1 * n2 + result[i+j+1]
      result[i+j+1] = sum % 10
      // 进位
      result[i+j] += Math.floor(sum / 10)
    }
  }
  // 去掉最后的 0
  return result.filter((item, index) => {
    return index === 0
      ? item !== 0
      : true
  })
  .join('')
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
