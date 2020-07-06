// 链表的实现
// let Node = function (data) {
//   this.data = data;
//   this.next = null
// }
// let node1 = new Node(1);
// let node2 = new Node(3);
// let node3 = new Node(5);
// node1.next = node2;
// node2.next = node3;
// console.log(node1.next.next.data);

function LinkList() {
  let Node = function (data) {
    this.data = data;
    this.next = null;
  };
  let length = 0;
  let head = null;
  let tail = null;
  // 向后添加
  this.append = (data) => {
    let new_node = new Node(data);
    // 当没有节点的时候
    if (!head) {
      head = new_node;
      tail = new_node;
    } else {
      tail.next = new_node;
      tail = new_node;
    }
    length += 1;
    return true;
  };
  this.print = () => {
    let cur_node = head;
    while (cur_node) {
      console.log(cur_node.data);
      cur_node = cur_node.next;
    }
  };
  // 任意位置插入
  this.insert = (index, data) => {
    // 如果是最后的节点，则直接append
    if (index === length) {
      return this.append(data);
    }
    // 不合法就退出
    if (index > length || index < 0) {
      return null;
    }
    let new_node = new Node(data);
    let cur_node = head;
    // 如果插到最前面
    if (index === 0) {
      new_node.next = head;
      head = new_node;
    } else {
      cur_node = this.get(index - 1);
      console.log(cur_node);
      new_node.next = cur_node.next;
      cur_node.next = new_node;
    }

    length += 1;
    return true;
  };

  // 移除任意位置
  this.remove = (index) => {
    if (index < 0 || index >= length) {
      return null;
    }
    let del_node = null;
    if (index === 0) {
      del_node = head;
      head = head.next;
    } else {
      let cur_node = head;
      let per_node = this.get(index - 1); // 获取前一个节点
      del_node = per_node.next;
      per_node.next = del_node.next;
      if (cur_node.next === null) {
        tail = per_node;
      }
    }
    length -= 1;
    del_node.next = null;
    return del_node.data;
  };
  // 获取index节点元素
  this.get = (index) => {
    if (index < 0 || index >= length) {
      return null;
    }
    let cur_node = head;

    for (let i = 0; i < index; i++) {
      cur_node = cur_node.next;
    }
    return cur_node;
  };
  this.head = () => {
    let cur_node = head;
    return cur_node;
  };
  // 删除头节点
  this.remove_head = () => {
    return this.remove(0);
  };
  // 删除尾节点
  this.remove_tail = () => {
    return this.remove(length - 1);
  };
  // 返回尾节点数据
  this.tail = () => {
    return this.get(length - 1);
  };
  this.isEmpty = () => {
    return length === 0;
  };
  this.clear = () => {
    head = null;
    tail = 0;
    length = 0;
  };
}
// let linkList = new LinkList();
// linkList.append(2);
// linkList.append(3);
// linkList.append(4);
// linkList.remove(0);
// linkList.print();
// console.log('----------')

// 反转链表 迭代
// function reverse_iter(head) {
//   console.log(head, '头节点');
//   if (!head) {
//     return null;
//   }
//   // 前⼀一个节点
//   var pre_node = null;
//   // 当前要翻转的节点
//   var curr_node = head;
//   while (curr_node) {
//     var next_node = curr_node.next;
//     curr_node.next = pre_node;
//     pre_node = curr_node;
//     curr_node = next_node;
//   }
//   // 下⼀一个节点
//   // 对当前节点进⾏行行翻转 // pre_node向后滑动 // curr_node向后滑动
//   //最后要返回pre_node,当循环结束时,pre_node指向翻转前链表的最后⼀一个节点
//   return pre_node;
// };

// // 递归反转
// let a = 0;
function reverse_digui(head) {
  console.log(head, "参数节点");
  if (!head) {
    return null;
  }
  if (head.next == null) {
    return head;
  }
  let new_node = reverse_digui(head.next);
  console.log("看一下标式", head);
  console.log("---------");

  head.next.next = head;
  console.log("看一下标式1", head);
  head.next = null;
  return new_node;
}
let Node = function (data) {
  this.data = data;

  this.next = null;
};
let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
let node4 = new Node(4);
let node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

let Node1 = function (data) {
  this.data = data;

  this.next = null;
};
let node6 = new Node(3);
let node7 = new Node(4);
let node8 = new Node(5);
let node9 = new Node(6);
let node10 = new Node(7);

node6.next = node7;
node7.next = node8;
node8.next = node9;
node9.next = node10;
function print(node) {
  let cur_node = node;
  while (cur_node) {
    console.log(cur_node.data);
    cur_node = cur_node.next;
  }
}
// console.log(reverse_digui(node1))
// print(reverse_digui(node1));
// linkList.print();

// 倒叙打印

function reverse_print(head) {
  if (head === null) {
    return;
  }
  reverse_print(head.next);
  console.log(head.data);
}
// reverse_print(node1);

// 合并两个有序的链表

function merge_link(head1, head2) {
  if (head1 === null) {
    return head2;
  }
  if (head2 === null) {
    return head1;
  }
  let merge_head = new Node("head");
  let merge_tail = merge_head;
  let temp = 0;

  while (head1 && head2) {
    if (head1.data < head2.data) {
      temp = head1.data;
      head1 = head1.next;
    } else {
      temp = head2.data;
      head2 = head2.next;
    }
    merge_tail.next = new Node(temp);
    merge_tail = merge_tail.next;

    console.log("---", merge_head);
  }

  merge_tail.next = head1 || head2;
  return merge_head;
}
print(merge_link(node1, node7));
// print(Node)