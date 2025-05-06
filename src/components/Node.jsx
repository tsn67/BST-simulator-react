import React, { useEffect, useState } from 'react';

export default ({ value, id }) => {

    const [fontSize, setFontSize] = useState(2);
    //prop.id is important for X arrows to work,
    //value is maximum 4 digited

    const fontValues = [2, 1.6, 1.4, 1.2];

    useEffect(() => {
        setFontSize(fontValues[value.toString().length - 1]);
    }, []);

    useEffect(() => {
        const handleScreenSize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setFontSize(fontValues[value.toString().length - 1] - 0.5);
            } else {
                setFontSize(fontValues[value.toString().length - 1]);
            }
        };
        handleScreenSize();
        window.addEventListener('resize', handleScreenSize);

        return () => {
            window.removeEventListener('resize', handleScreenSize);
        };
    }, [value]);

    return (
        <div
            id={id}
            className={` rounded-full min-h-[40px] min-w-[40px] md:min-w-[60px] md:min-h-[60px]  bg-nodeGreen outline-[2px] outline-textGreenLight grid place-content-center`}
        >
            <h1
                style={{ fontSize: `${fontSize}rem` }}
                className={`select-none  text-white  font-primary   md:font-normal`}
            >
                {value}
            </h1>
        </div>
    );
};
