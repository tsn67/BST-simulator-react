import React, { useEffect, useState } from 'react';
import Node from './Node';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { updateContollerStore } from '../store/updateStore';
import { TreeStore } from '../store/TreeStore';
import TreeNode from '../utils/TreeNode';
import { visualStore } from '../store/VisualStore';

export default () => {

    const rootNode = TreeStore(state => state.root);
    const updateStatus = updateContollerStore(state => state.updateStatus);
    const [render, setRender] = useState(false);
    const updateRootNode = TreeStore(state => state.updateRoot);
    const addNewNode = TreeStore(state => state.addNode);
    const nodes = visualStore.getState().nodes;


    useEffect(() => {
        const timeOut = setTimeout(() => {
            setRender((prev) => !prev);
        }, 100);

        updateRootNode(new TreeNode(3));
        addNewNode(4);
        addNewNode(2);
        addNewNode(5);
        //timeout is performed to trigger a render to update the xarrows correctly
        return () => {
            clearTimeout(timeOut);
        }
    }, []);

    useEffect(() => {
        console.log(rootNode);
    }, [rootNode]);

    useEffect(() => {
    }, [updateStatus])


    useEffect(() => {
        console.log(nodes);
    }, [nodes]);

    //testing purpose
    return (
        <Xwrapper>
            <div className="flex flex-col  mt-20 gap-[200px]">
                {rootNode != null && <Node value={rootNode.value} id={rootNode.value}></Node>}
            </div>
        </Xwrapper>
    );
};
