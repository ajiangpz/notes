var verifyPostorder = function (postorder) {
  console.log(postorder);
  // 获取根节点的索引
  var rootIndex = postorder.length - 1;
  // 找到一个比根节点小的索引
  var i;
  for (i = 0; i < rootIndex; i++) {
    if (postorder[i] > postorder[rootIndex]) {
      break;
    }
  }
  var rightIndex = i;
  // 判断右子树是否符合规则
  for (var j = 0; j < rootIndex; j++) {
    if (postorder[j] < postorder[rootIndex]) {
      return false;
    }
  }
  // 递归判断
  // 判断左子树存不存在
  var leftValid = true;
  if (i > 0) {
    leftValid = verifyPostorder(postorder.slice(0, rightIndex));
  }
  // 判断右数存不存在
  var rightValid = true;
  if (i < rootIndex) {


    rightValid = verifyPostorder(postorder.slice(rightIndex, rootIndex));
  }
  return leftValid && rightValid;
};
verifyPostorder([3, 10, 6, 9, 2]);
