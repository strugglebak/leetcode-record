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

// test code
let l1 = new ListNode(6)
l1 = insert(l1, 4)
l1 = insert(l1, 5)
l1 = insert(l1, 0)
l1 = insert(l1, 4)
l1 = insert(l1, 4)
l1 = insert(l1, 9)
l1 = insert(l1, 4)
l1 = insert(l1, 1)
console.log(l1)

let l2 = new ListNode(3)
l2 = insert(l2, 8)
l2 = insert(l2, 8)
l2 = insert(l2, 0)
l2 = insert(l2, 3)
l2 = insert(l2, 0)
l2 = insert(l2, 1)
l2 = insert(l2, 4)
l2 = insert(l2, 8)
console.log(l2)

console.log(addTwoNumbers(l1, l2))
