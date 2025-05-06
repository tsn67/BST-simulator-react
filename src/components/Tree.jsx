import React, { useEffect, useRef, useState } from 'react';
import { updateContollerStore } from '../store/updateStore';
import { TreeStore } from '../store/TreeStore';
import TreeNode from '../utils/TreeNode';
import { visualStore } from '../store/VisualStore';
import Node from './Node';
import panzoom from 'panzoom';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';

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
                maxZoom: 1,
                minZoom: 1,
                bounds: true,
                boundsPadding: 0.01,
            });

        }

        updateRootNode(new TreeNode(10));
        addNewNode(7);
        addNewNode(6);
        addNewNode(5);
        addNewNode(4);
        addNewNode(11);
        addNewNode(7);
        addNewNode(8);
        addNewNode(6);
        addNewNode(14);
        addNewNode(12);
        addNewNode(1001);
        addNewNode(0);
        addNewNode(1002);
        addNewNode(2002);
        addNewNode(4001);
        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    useEffect(() => {
        console.log(rootNode);
    }, [rootNode]);

    useEffect(() => {}, [updateStatus]);

    useEffect(() => {
        console.log(nodes);
        console.log(xArrowIds);
    }, [nodes, xArrowIds]);

    //testing purpose
    return (
            <div className="" ref={treeContainerRef}>
                <TreeContainer render={render}  nodes={nodes} xArrowIds={xArrowIds}></TreeContainer>
            </div>
    );
};

const TreeContainer = ({ xArrowIds, nodes, refObj, render }) => {

    useEffect(() => {
        const timeOut = setTimeout(() => {
            useXarrow();
        }, 100);

        return () => {
            clearTimeout(timeOut);
        }
    }, []);


    return (
    <Xwrapper>
        <div className="flex flex-col gap-10" ref={refObj}>
            {nodes &&
                nodes.map((el, i) => {
                    if (i == nodes.length - 1) return;
                    else {
                        return (
                            <div className="flex justify-center flex-row gap-10">
                                {el.map((n, j) => {
                                    if (n == -1) {
                                        return (
                                            <div className=" mr-4 rounded-full bg-transparent"></div>
                                        );
                                    } else {
                                        return <Node value={n.value} id={`${n.value}`}></Node>;
                                    }
                                })}
                            </div>
                        );
                    }
                })}

            {xArrowIds &&
                xArrowIds.map((el, i) => {
                    return <Xarrow start={`${el.start}`} end={`${el.end}`} color='white' strokeWidth={2} path='straight' headSize={0}></Xarrow>;
                })}

        </div>

    </Xwrapper>
    );
};
