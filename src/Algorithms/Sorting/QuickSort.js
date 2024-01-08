const QuickSort = barsValues => {
    const animationStates = [];
    const newBarsValues = [...barsValues];

    animationStates.push({ op: 'sort', barsIdxs: [0] });
    quickSortAux(newBarsValues, 0, newBarsValues.length - 1, animationStates);

    return [animationStates, barsValues];
};


const quickSortAux = (newBarsValues, left, right, animationStates) => {
    let index;
    if (newBarsValues.length > 1) {
        index = partition(newBarsValues, left, right, animationStates);
        if (left < index - 1) {
            quickSortAux(newBarsValues, left, index - 1, animationStates);
        }
        
        if (index < right) {
            quickSortAux(newBarsValues, index, right,animationStates);
        }
    }
}


const partition = (newBarsValues, left, right, animationStates) => {
    let pivot = newBarsValues[Math.floor((right + left) / 2)]
    let i = left
    let j = right;

    while (i <= j) {
        animationStates.push({ op: 'compare', barsIdxs: [i, j] });

        while (newBarsValues[i] < pivot) {
            animationStates.push({ op: 'compare', barsIdxs: [i, pivot] });
            i++;
        }

        while (newBarsValues[j] > pivot) {
            animationStates.push({ op: 'compare', barsIdxs: [pivot, j] });
            j--;
        }

        if (i <= j) {
            let tmp = newBarsValues[i];
            newBarsValues[i] = newBarsValues[j];
            newBarsValues[j] = tmp;
            animationStates.push({ op: 'compare', barsIdxs: [i, j] });
            animationStates.push({ op: 'swap', barsIdxs: [i, j] });
            i++;
            j--;
        }
    }

    animationStates.push({ op: 'sort', barsIdxs: [i] });

    return i;
}

export default QuickSort;