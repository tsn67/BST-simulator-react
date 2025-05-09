import TreeNode from './TreeNode';


const addTreeNode = (newValue, root) => {


    //perform the search for the positoin to insert
    if (root == null) {
        return {
            root: new TreeNode(newValue)
        };
    }

    //following operations will be udpated to include the procedure(step by step visulaisation) related features
    let tempNode = root;
    let parentNode = null;
    let level = 0;
    while (tempNode != null) {
        if (tempNode.value < newValue) {
            parentNode = tempNode;
            tempNode = tempNode.right;
        } else if (tempNode.value > newValue) {
            parentNode = tempNode;
            tempNode = tempNode.left;
        } else {
            return {
                msg: 'error! node already exists!',
            };
        }
        level++;
    }

    let direction = 'left';
    let newNode = new TreeNode(newValue);
    if (newValue < parentNode.value) {
        parentNode.left = newNode;
    } else {
        parentNode.right = newNode;
        direction = 'right';
    }

    return {root:root, direction: direction, parentValue: parentNode.value, level:level};
};

export { addTreeNode };
