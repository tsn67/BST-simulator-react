import { create } from 'zustand';
import TreeNode from '../utils/TreeNode';
import { addTreeNode } from '../utils/BSToperations';
import { visualStore } from './VisualStore';

const TreeStore = create((set, get) => {

    return {
        root: new TreeNode(2),
        updateRoot: (newNode) => {
            set((state) => ({root: newNode}));
            visualStore.getState().addNewNode(null, null, newNode.value, 0);
        },
        addNode: (nodeValue) => {
            const oldRoot = get().root;
            const result = addTreeNode(nodeValue, oldRoot);
            if(!result.msg) {
                set(() => ({root: result.root}));
                visualStore.getState().addNewNode(result.parentValue, result.direction, nodeValue, result.level);
            }
        }
    }

});

export { TreeStore };
