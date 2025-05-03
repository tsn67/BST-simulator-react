import React from "react";
import "./styles/index.css"

export default () => {

    return <div className=" bg-gray-600  w-screen h-screen grid place-content-center">
            <div className="w-[200px] h-[40px] bg-background "></div>
            <div className="w-[200px] h-[40px] bg-textGreenLight"></div>
            <div className="w-[200px] h-[40px] bg-nodeGreen"></div>
            <div className="w-[200px] h-[40px] bg-secondaryGreen"></div>
            <div className="w-[200px] h-[40px] bg-textGreenDark"></div>
            <h1 className="text-white font-primary text-2xl">Check Text</h1>
        </div>
}
