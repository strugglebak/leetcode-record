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
