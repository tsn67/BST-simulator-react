import React, { useEffect, useState } from "react";

export default ({value, id = "test123"}) => {


    const [fontSize, setFontSize] = useState(2);
    //prop.id is important for X arrows to work,
    //value is maximum 4 digited

    const fontValues = [2, 1.6, 1.4, 1.2];

    useEffect(() => {
        setFontSize(fontValues[value.toString().length - 1]);

        if(!value) {
            console.log('value is null for the node id '+id);
        }
    }, []);

    useEffect(() => {
        const handleScreenSize= () => {
            const width = window.innerWidth;
            if(width < 768) {
                setFontSize(fontValues[value.toString().length - 1] - 0.4);
            } else {
                setFontSize(fontValues[value.toString().length - 1]);
            }
        }
        handleScreenSize();
        window.addEventListener('resize', handleScreenSize);

        return () => {
            window.removeEventListener('resize', handleScreenSize)
        }
    }, [value]);

    return <div id={id} className= {` rounded-full md:w-[60px] md:h-[60px] w-[40px] h-[40px] bg-nodeGreen outline-[2px] outline-textGreenLight grid place-content-center`}>
            <h1 style={{fontSize: `${fontSize}rem`}} className={`select-none  text-white  font-primary   md:font-normal`}>{value}</h1>
        </div>
}
