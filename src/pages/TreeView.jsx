import React from 'react';
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
        <div className="min-h-screen min-w-screen bg-background flex flex-row ">
            <div className="h-screen min-w-screen box-border bg-white ">
                <h1>frame 1</h1>
            </div>

            <div className="min-h-screen min-w-screen bg-yellow-200 box-border ">
                <div className="min-h-screen min-w-screen grid place-content-center">1</div>
                <div className="min-h-screen min-w-screen grid place-content-center">2</div>
            </div>
        </div>
    );
};

//tree view contains the bst visual representation
//the page is zoomable (also grows without any scrolling)
