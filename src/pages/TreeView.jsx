import React, { useEffect, useRef, useState } from 'react';
import Tree from '../components/Tree';
import { updateContollerStore } from '../store/updateStore';

export default () => {



    return (
        <div
           className="h-screen w-screen bg-background  overflow-scroll"
        >
            <Tree></Tree>
        </div>
    );
};

//tree view contains the bst visual representation
//the page is zoomable (also grows without any scrolling)
