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
    const xArrowIds = visualStore.getState().xArrowIds;

    useEffect(() => {
        //timeout is performed to trigger a render to update the xarrows correctly
        const timeOut = setTimeout(() => {
            setRender(prev => !prev);
        }, 100);

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
        <Xwrapper>
            <div className="">
                <TreeContainer nodes={nodes} xArrowIds={xArrowIds}></TreeContainer>
            </div>
        </Xwrapper>
    );
};

const TreeContainer = ({ xArrowIds, nodes }) => {
    return (
        <>
            <div className="md:min-w-[50vw] min-w-screen flex flex-col gap-[40px] bg-transparent">
                {nodes && (
                    <>
                        {nodes.map((el, i) => {
                            if(i == nodes.length - 1) return; //elminate the last level from visual representation
                            return (
                                <div className="w-full   flex flex-row  justify-center">

                                    {el.map((node, index) => {
                                        if (node == -1) {
                                            return (
                                                <div className="w-[40px] h-[40px] bg-transparent m-[10px] rounded-full"></div>
                                            );
                                        } else {
                                            return <div className='m-[10px]'><Node id={`${node.value}`} value={node.value}></Node></div>;
                                        }
                                    })}
                                </div>
                            );
                        })}
                    </>
                )}

                {xArrowIds && (
                    <>
                        {xArrowIds.map(el => {
                            return (
                                <Xarrow
                                    start={`${el.start}`}
                                    end={`${el.end}`}
                                    path="straight"
                                    color="#9BD678"
                                    headSize={0}
                                    strokeWidth={2}
                                ></Xarrow>
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
};
