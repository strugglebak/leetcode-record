/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = (s) => {
  let length = 0, str = ''
  s.split('').forEach(item => {
    // 两两比较大小
    const index = str.indexOf(item)
    if (index > -1) {
      // 如果找到了，说明在这个字符串中有重复的字符
      // 拼接字符串，将 abca -> bca
      str = str.substring(index + 1, str.length) + item
    } else {
      // 如果没有找到，说明可以继续加字符
      str += item
    }

    // 每次都比较两字符串的长度，只要最大的那个
    length = Math.max(...[length, str.length])
  })

  return str
}

console.log(lengthOfLongestSubstring('abcabcb1234567'))
console.log(lengthOfLongestSubstring('bbbbb'))
console.log(lengthOfLongestSubstring('123456dvdf'))
console.log(lengthOfLongestSubstring('pw1234565wkew'))
