# leetcode-record

leetcode 刷题记录

## 两数之和

最简单的解法

```js
var twoSum = function(nums, target) {
  if (nums.length === 2) {
      return [0, 1]
  }
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}
```

## 无重复字符的最长子串

```js
var lengthOfLongestSubstring = function (s) {
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

  return length
}
```

虽然是抄的，但是这种解法最简单，在一次循环中通过两两比较出来的 length，最后得出来的总是最大的，很妙
