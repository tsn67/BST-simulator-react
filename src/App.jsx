import React from "react";
import "./styles/index.css"
import Node from "./components/Node";

export default () => {

    return <div className=" bg-background w-screen h-screen grid place-content-center">
            <Node value={23}></Node>
        </div>
}
