
const getNodePosition = (parentValue, childValue, parentLeft, parentTop) =>  {

    parentTop += 100;
    if(childValue < parentValue) {
        parentLeft -= 100;
    } else {
        parentLeft += 100;
    }

    return {
        left: parentLeft,
        top: parentTop,
    }
}

export default getNodePosition;
