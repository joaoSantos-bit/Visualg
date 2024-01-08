const animationStates = [];
const HeapSort = barsValues => {
    const newBarsValues = [...barsValues];
    
    heapSortAux(newBarsValues, animationStates);
    animationStates.push({ op: 'sort', barsIdxs: [0] });

    return [animationStates, newBarsValues];
}

const heapSortAux = (newBarsValues) => {
    const len = newBarsValues.length;

    for (let i = len / 2 - 1; i >= 0; i--) {
        buildHeap(newBarsValues, len, i);
    }

    for (let i = len - 1; i > 0; i--) {
        let tmp = newBarsValues[i];
        newBarsValues[i] = newBarsValues[0];
        newBarsValues[0] = tmp;
        
        animationStates.push({ op: 'swap', barsIdxs: [i, 0] });
        animationStates.push({ op: 'sort', barsIdxs: [i] });
        buildHeap(newBarsValues, i, 0);
    }
};

const buildHeap = (newBarsValues, len, i) => {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;

    if (left < len && newBarsValues[left] > newBarsValues[max]) {
        max = left;
        animationStates.push({ op: 'compare', barsIdxs: [left, max] });
    }

    if (right < len && newBarsValues[right] > newBarsValues[max]) {
        max = right;
        animationStates.push({ op: 'compare', barsIdxs: [right, max] });
    }

    if (max !== i) {
        let tmp = newBarsValues[i];
        newBarsValues[i] = newBarsValues[max];
        newBarsValues[max] = tmp;
        
        animationStates.push({ op: 'swap', barsIdxs: [i, max] });
        buildHeap(newBarsValues, len, max, animationStates);
    }
};


export default HeapSort;