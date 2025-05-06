import { createStore } from 'zustand';

const visualStore = createStore((set, get) => {
    /*
     *  xArrowIds = [{start, end}, {start, end}] //id of nodes
     *  nodes = [[{parentValue, direction, nodeValue }], [..............]]
     *
     *
     *
    */

    return {

        xArrowIds: [],
        nodes: [],
        addnewXarrow: (id1, id2) => {
            set(state => ({ xArrowIds: [...state.xArrowIds, { start: id1, end: id2 }] }));
        },

        addNewNode: (parentValue, direction, value, level) => {
            if(level == 0) {
                //that means inserting the root
                set({nodes: [[{parentValue:null, direction:null, value:value, level: 0}], [-1, -1]]});
                return;
            }

            const state = get();


            const currentNodes = [...state.nodes];
            if(!currentNodes[level + 1]) {
                currentNodes.push(new Array(Math.pow(2, level + 1)).fill(-1)); //empty nodes are pushed
            }
            const upperLevel = currentNodes[level-1];
            let parentIndex = upperLevel.indexOf((el) => el.nodeValue == parentValue);
            if(direction == 'left') {
                currentNodes[level][parentIndex + 1] = {parentValue: parentValue, direction: 'left', value: value, level: level}
            } else {
                currentNodes[level][parentIndex + 2] = {parentValue: parentValue, direction: 'left', value: value, level: level}
            }
            set({nodes: currentNodes});
        },
    };
});

export { visualStore };
