

class TreeNode {

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    addLeftChild(leftNode) {
        this.left = leftNode;
    }

    addRightChild(rightNode) {
        this.right = rightNode;
    }
}

export default TreeNode;
