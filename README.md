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

## 两数相加

两数相加这个，看题目，原本思路是 数组 -> 字符串 -> 数字相加，但是后面看到也许数字很大以致于相加数字太大了所以采取 **链表** 的形式来做，瞬间明白了他的做法了。现在的基本思路就是先将对应的数组的数字加起来，然后后面再统一做一个进位的操作

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  // 用栈遍历 l1 找出数
  let array1 = getNumArray(l1)
  let array2 = getNumArray(l2)
  const length1 = array1.length
  const length2 = array2.length
  console.log(array1, array2)
  let result = []
  // 数组顺序 个/十/百...
  if (length1 >= length2) {
    array1.forEach((item, index) => {
      result.push(item + (array2[index] || 0))
    })
  } else {
    array2.forEach((item, index) => {
      result.push(item + (array1[index] || 0))
    })
  }
  console.log(result)
  // 找出数组中大于 10 的数，然后分别进位
  // [12, 8] -> [2, 9]
  let final
  let ret = result.map((item, index) => {
    if (item >= 10) {
      item = item % 10
      // 进位
      if (result[index + 1] !== 0 && !result[index + 1]) {
        final = 1
      } else {
        result[index + 1] += 1
      }
    }
    return item
  })
  console.log(ret)

  final && ret.push(final)

  // 倒序形成一个链表
  let list = null
  ret.forEach(item => {
    list = insert(list, item * 1)
  })
  return list
}

function ListNode(val) {
  this.val = val
  this.next = null
}

function insert(list, val) {
  const newNode = new ListNode(val)
  if (!list) return newNode
  let curNode = list

  // 找到尾巴节点
  while(curNode.next) {
    curNode = curNode.next
  }
  curNode.next = newNode
  return list
}

function getNumArray(list) {
  let curNode = list
  const array = []
  do {
    array.push(curNode.val)
    curNode = curNode.next
  } while (curNode)

  return array
}
```

的确不是很优雅的方式，待后面优化吧，返回过了哈哈哈

## 字符串相乘

没啥新的思路，本质上就是利用 **竖乘法** 加上 **两数相加原理搞的**

```js
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
```
