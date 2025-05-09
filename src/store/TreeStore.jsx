import { create } from 'zustand';
import TreeNode from '../utils/TreeNode';
import { addTreeNode } from '../utils/BSToperations';

const TreeStore = create((set, get) => {

    return {
        root: null,
        updateRoot: (newNode) => {
            set((state) => ({root: newNode}));
        },
        addNode: (nodeValue) => {
            const oldRoot = get().root;
            const result = addTreeNode(nodeValue, oldRoot);
            if(!result.msg) {
                set(() => ({root: result.root}));
            }
        }
    }

});

export { TreeStore };
