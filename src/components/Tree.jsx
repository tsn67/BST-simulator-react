import React, { Children, useEffect, useReducer, useRef, useState } from 'react';
import { updateContollerStore } from '../store/updateStore';
import { TreeStore } from '../store/TreeStore';
import TreeNode from '../utils/TreeNode';
import Node from './Node';
import panzoom from 'panzoom';
import getNodePosition from '../utils/NodePosition';
import { Xwrapper } from 'react-xarrows';

export default () => {
    const rootNode = TreeStore(state => state.root);
    const updateStatus = updateContollerStore(state => state.updateStatus);
    const updateRootNode = TreeStore(state => state.updateRoot);
    const addNewNode = TreeStore(state => state.addNode);
    const treeContainerRef = useRef(null);

    useEffect(() => {
        if (treeContainerRef.current) {
            const instance = panzoom(treeContainerRef.current, {
                maxZoom: 3,
                minZoom: 0.6,
                bounds: true,
                boundsPadding: 0.01,
            });
        }


        addNewNode(2);
        addNewNode(1);
        addNewNode(-1);
        addNewNode(10);
        addNewNode(100);
        addNewNode(9);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    useEffect(() => {}, [rootNode]);


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
    const [edgeLength, setEdgeLength] = useState(null);
    const [edgeAngle, setEdgeAngle] = useState(null); //only for left nodes, for right nodes it is (180 - leftAngle)
    const [edgePositions, setEdgePositions] = useState([]);

    useEffect(() => {
        if (containerRef.current) {
            const panZoomInstance = panzoom(containerRef.current, {
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
            const tempEdgePos = [];
            // Add root node
            // calculate the center of the container , (containerRef)
            const rect = containerRef.current.getBoundingClientRect();
            positions.push({
                left: Math.floor(rect.width / 2 - 50), //50px for node circle div
                top: 100,
                value: rootNode.value,
            });

            // Recursive traversal
            function traverseTree(node, parent) {
                if (!node || !parent) return;
                const parentPos = positions.find(p => p.value === parent.value);
                if (!parentPos) return;

                //calculate the edge length and angle

                const pos = getNodePosition(parent.value, node.value, parentPos.left, parentPos.top);
                positions.push({
                    left: pos.left,
                    top: pos.top,
                    value: node.value,
                });

                if (!edgeLength) {
                    let x = Math.abs(parentPos.left - pos.left);
                    let y = Math.abs(parentPos.top - pos.top);
                    let z = Math.ceil(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
                    //console.log(z);
                    setEdgeLength(z); //length in px
                }

                if (!edgeAngle) {
                    function tanInverseDegrees(x) {
                        return Math.atan(x) * (180 / Math.PI);
                    }
                    let x = Math.abs(parentPos.left - pos.left);
                    let y = Math.abs(parentPos.top - pos.top);

                    let tempAngleInDegree = tanInverseDegrees(y / x);
                    setEdgeAngle(tempAngleInDegree);
                    //console.log(tempAngleInDegree);
                }

                tempEdgePos.push({
                    top: pos.top,
                    left: pos.left,
                    type: parent.value > node.value ? 'left' : 'right',
                });

                traverseTree(node.left, node);
                traverseTree(node.right, node);
            }

            traverseTree(rootNode.left, rootNode);
            traverseTree(rootNode.right, rootNode);

            // Once traversal is done, set state
            setNodePositions(positions);
            setEdgePositions(tempEdgePos);
        }
    }, [rootNode]);

    useEffect(() => {
        console.log(nodePositions);
    }, [nodePositions]);

    return (
        <Xwrapper>
            <div ref={containerRef} className="relative w-screen h-screen grid overflow-visible">
                {nodePositions.length != 0 &&
                    nodePositions.map((el, i) => {
                        {
                            console.log(el);
                        }
                        return (
                            <div style={{ left: `${el.left}px`, top: `${el.top}px` }} className={`absolute`}>
                                <Node value={el.value} id={`${el.value}`}></Node>
                            </div>
                        );
                    })}

                {edgePositions.map((el, i) => {
                    if (el.type == 'right')
                        return (
                            <div
                                style={{
                                    rotate: `${edgeAngle}deg`,
                                    height: '2px',
                                    backgroundColor: '#9BD678',
                                    width: `${edgeLength}px`,
                                    left: `${el.left - 90}px`,
                                    top: `${el.top - 30}px`,
                                    position: 'absolute',
                                }}
                                className="-z-10"
                            ></div>
                        );
                    return (
                        <div
                            style={{
                                rotate: `${180 - edgeAngle}deg`,
                                height: '2px',
                                backgroundColor: '#9BD678',
                                width: `${edgeLength}px`,
                                left: `${el.left}px`,
                                top: `${el.top}px`,
                                position: 'absolute',
                            }}
                            className="-z-10"
                        ></div>
                    );
                })}
            </div>
        </Xwrapper>
    );
};
