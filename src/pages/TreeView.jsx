import React, { useEffect, useRef, useState } from 'react';
import Tree from '../components/Tree';
import { updateContollerStore } from '../store/updateStore';

export default () => {


    // scrolling based on mouse press and move (for pc)
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });

    // zustand store related method
    const updateStatus = updateContollerStore(state => state.updateState);

    const handleMouseDown = e => {
        setIsDragging(true);
        setStartPos({ x: e.clientX, y: e.clientY });
        setScrollPos({
            left: containerRef.current.scrollLeft,
            top: containerRef.current.scrollTop,
        });
        updateStatus();
    };

    const handleMouseMove = e => {
        if (!isDragging) return;
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        containerRef.current.scrollLeft = scrollPos.left - dx;
        containerRef.current.scrollTop = scrollPos.top - dy;
        updateStatus();
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);


    //tree update (xarrows) on scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = () => updateStatus();

        container.addEventListener('scroll', handleWheel);
        return () => {
            container.removeEventListener('scroll', handleWheel);
        };
    }, [containerRef.current]);

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
            className="h-screen w-screen bg-background p-12 flex flex-row justify-center overflow-scroll"
        >
            <Tree></Tree>
        </div>
    );
};

//tree view contains the bst visual representation
//the page is zoomable (also grows without any scrolling)
