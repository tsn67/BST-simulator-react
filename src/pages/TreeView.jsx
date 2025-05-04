import React, { useRef, useState } from 'react';
import Node from '../components/Node';

export default () => {


    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });

    const handleMouseDown = e => {
        setIsDragging(true);
        setStartPos({ x: e.clientX, y: e.clientY });
        setScrollPos({
            left: containerRef.current.scrollLeft,
            top: containerRef.current.scrollTop,
        });
    };

    const handleMouseMove = e => {
        if (!isDragging) return;
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        containerRef.current.scrollLeft = scrollPos.left - dx;
        containerRef.current.scrollTop = scrollPos.top - dy;
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
            className="h-screen w-screen bg-background flex flex-col items-center  overflow-scroll"
        >

            <div className="flex flex-col gap-20">
                {new Array(20).fill(0).map((element, index) => {
                    return <Node value={index}></Node>;
                })}
            </div>
        </div>
    );
};

//tree view contains the bst visual representation
//the page is zoomable (also grows without any scrolling)
