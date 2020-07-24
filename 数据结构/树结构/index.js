// js写一个树结构

/****
 * 概念 ： 
 * 1.节点 ： 树结构中的每一个子项、包含数据项和指向其他节点的指针
 * 2.节点的度 ： 节点拥有的子树的数量
 * 3.叶节点： 度为0的节点 被称为叶节点
 * 4.分支节点： 除叶节点以外的都是分支节点
 * 5.节点所在的层次： 根节点在第一层，子女在第二层，以次类推
 * 6.树的深度 ： 树中距离根节点最远的节点所处的层次就是树的深度
 * 7.树的高度 ： 叶节点的高度为1，非叶节点 的高度是它的子女节点高度最大值+1
 * 8.树的度：树中节点的度的最大值
 * 树的分类：
 * 1.二叉树：
 *  概念：二叉树 是树的一种特殊情况，每个节点最多有两个子女，分别称为该节点的左子女和右子女
 *  性质：
    在二叉树的第i(i>=1)层，最多有2i-1 个节点
    深度为k(k>=0)的二叉树，最少有k个节点，最多有2k-1 个节点
    对于一棵非空二叉树，叶节点的数量等于度为2的节点数量加1
 * 
 */
// 二叉树的类定义

const BinTreeNode = function (data) {
  this.data = data;
  this.leftChild = null; // 左孩子
  this.rightChild = null; // 右孩子
  this.parentNode = null; // 父节点
  // data表示数据，其他都是指针
};

function BinaryTree() {
  const root = null; // 根节点

  // 采用广义表表示 建立二叉树方法
  this.init_tree = function (string) {
    var stack = new Stack.Stack();
    var k = 0;
    var new_node = null;
    for (var i = 0; i < string.length; i++) {
      var item = string[i];
      if (item == "(") {
        stack.push(new_node);
        k = 1;
      } else if (item == ")") {
        stack.pop();
      } else if (item == ",") {
        k = 2;
      } else {
        new_node = BinTreeNode(item);
        if (root == null) {
          root = new_node;
        } else if (k == 1) {
          // 左子树
          var top_item = stack.top();
          top_item.leftChild = new_node;
          new_node.parentNode = top_item;
        } else {
          // 右子树
          var top_item = stack.top();
          top_item.rightChild = new_n;
          ode;
          new_node.parentNode = top_item;
        }
      }
    }
  };

  // 使用的都是深度优先遍历
  // 中序遍历
  this.in_order = function (node) {
    if (node === null) {
      return;
    }
    this.in_order(node.leftChild);
    // do something
    console.log(node.data);
    this.in_order(node.rightChild);
  };

  // 前序遍历
  this.pre_order = function (node) {
    if (node === null) {
      return;
    }
    // do something
    console.log(node.data);
    this.pre_order(node.leftChild);
    this.pre_order(node.rightChild);
  };

  // 后序遍历 先访问子节点，最后访问根节点
  this.post_order = function (node) {
    if (node === null) {
      return;
    }
    this.post_order(node.leftChild);
    this.post_order(node.rightChild);
    // do something
    console.log(node.data);
  };

  // 广度优先遍历
  this.layer_traver = function (node) {
    let head = 0;
    let tail = 0;
    const arr = [];
    let temp;
    if (node !== null) {
      arr[head] = node;
      tail++;
    } else {
      return;
    }
    while (head < tail) {
      temp = arr[head];
      // do something
      console.log(temp.data);
      // 若左侧子树非空则会读取其子树
      if (temp.leftChild !== null) {
        arr[tail] = temp.leftChild;
        tail++;
      }
      // 同上
      if (temp.rightChild !== null) {
        arr[tail] = temp.rightChild;
        tail++;
      }
      head++;
    }
    return;
  };

  // 返回节点数量
  this.tree_node_count = function (node) {
    if (!node) {
      return 0;
    }
    const left_node_count = this.tree_node_count(node.leftChild);
    const right_node_count = this.tree_node_count(node.rightChild);
    return left_node_count + right_node_count + 1;
  };

  // 返回树的高度
  this.tree_height = function (node) {
    if (!node) {
      return 0;
    }
    const left_child_height = this.tree_height(node.leftChild);
    const right_child_height = this.tree_height(node.rightChild);
    if (left_child_height > right_child_height) {
      return left_child_height + 1;
    } else {
      return right_child_height + 1;
    }
  };

    //   查找节点
  this.find_node = function(node,data) {
    if(!node) {
        return null
    }
    if(node.data === data) {
        return node
    }
    const left_res = this.find_node(node.leftChild,data)
    if(left_res){
        return left_res
    }
    return this.find_node(node.rightChild,data)



  }
}

// 中序遍历  迭代的写法
var inorderTraversal = function(root) {
  const arr = []
  const stack = []
  let curr = root

  while(curr !== null || stack.length > 0) {
    while(curr !== null) {
      stack.push(curr)
      curr = curr.left
    }
    curr = stack.pop()
    arr.push(curr.val)
    curr = curr.right    
  }
  return arr;
}