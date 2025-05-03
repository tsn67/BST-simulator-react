import React from "react";

export default ({value, id = "test123"}) => {
    
    //prop.id is important for X arrows to work,
    //the component has only visual representation

    return <div className= {` rounded-full md:w-[60px] md:h-[60px] w-[40px] h-[40px] bg-nodeGreen outline-[2px] outline-textGreenLight grid place-content-center`}>
            <h1 className={`text-white md:text-2xl text-xl md:font-semibold`}>{value}</h1>
        </div>
}
