import React, { useEffect, useReducer, useRef, useState } from 'react';
import { updateContollerStore } from '../store/updateStore';
import { TreeStore } from '../store/TreeStore';
import TreeNode from '../utils/TreeNode';
import { visualStore } from '../store/VisualStore';
import Node from './Node';
import panzoom from 'panzoom';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import getNodePosition from '../utils/NodePosition';

export default () => {
    const rootNode = TreeStore(state => state.root);
    const updateStatus = updateContollerStore(state => state.updateStatus);
    const [render, setRender] = useState(false);
    const updateRootNode = TreeStore(state => state.updateRoot);
    const addNewNode = TreeStore(state => state.addNode);
    const nodes = visualStore.getState().nodes;
    const xArrowIds = visualStore.getState().xArrowIds;
    const treeContainerRef = useRef(null);

    useEffect(() => {
        //timeout is performed to trigger a render to update the xarrows correctly
        const timeOut = setTimeout(() => {
            setRender(prev => !prev);
        }, 100);

        if (treeContainerRef.current) {
            const instance = panzoom(treeContainerRef.current, {
                maxZoom: 3,
                minZoom: 0.6,
                bounds: true,
                boundsPadding: 0.01,
            });
        }

        updateRootNode(new TreeNode(10));
        addNewNode(9);
        addNewNode(100);
        addNewNode(8);
        addNewNode(1001);
        addNewNode(2001);
        addNewNode(901);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    useEffect(() => {}, [rootNode]);

    useEffect(() => {}, [updateStatus]);

    useEffect(() => {}, [nodes, xArrowIds]);

    //testing purpose
    return (
        <div className="">
            <TreeContainer rootNode={rootNode} containerRef={treeContainerRef}></TreeContainer>
        </div>
    );
};

const TreeContainer = () => {
    const [nodePositions, setNodePositions] = useState([]);
    const rootNode = TreeStore(state => state.root);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            panzoom(containerRef.current, {
                maxZoom: 3,
                minZoom: 0.6,
                bounds: true,
                boundsPadding: 0.01,
            });
        }
    }, []);

    useEffect(() => {
        if (rootNode != null) {
            const positions = [];

            // Add root node
            positions.push({
                left: 0,
                top: 0,
                value: rootNode.value,
            });

            // Recursive traversal
            function traverseTree(node, parent) {
                if (!node || !parent) return;
                const parentPos = positions.find(p => p.value === parent.value);
                if (!parentPos) return;

                const pos = getNodePosition(parent.value, node.value, parentPos.left, parentPos.top);
                positions.push({
                    left: pos.left,
                    top: pos.top,
                    value: node.value,
                });

                traverseTree(node.left, node);
                traverseTree(node.right, node);
            }

            traverseTree(rootNode.left, rootNode);
            traverseTree(rootNode.right, rootNode);

            // Once traversal is done, set state
            setNodePositions(prev => positions);
        }
    }, [rootNode]);

    useEffect(() => {
        console.log(nodePositions);
    }, [nodePositions]);

    return (
        <Xwrapper>
            <div ref={containerRef} className="relative w-screen h-screen grid ">
                {nodePositions.length != 0 &&
                    nodePositions.map((el, i) => {
                        {
                            console.log(el);
                        }
                        return (
                            <div style={{ left: `${el.left}px`, top: `${el.top}px` }} className={`absolute`}>
                                <Node value={el.value}></Node>
                            </div>
                        );
                    })}
            </div>
        </Xwrapper>
    );
};
