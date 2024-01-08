const InsertionSort = barsValues => { 
    const newBarsValues = [...barsValues];
    const animationStates = [];

    animationStates.push({ op: 'sort', barsIdxs: [0] });

    for (let i = 1; i < newBarsValues.length; i++) {
        let current = newBarsValues[i];
        let j = i - 1;
        animationStates.push({ op: 'compare', barsIdxs: [i] });

        while (j > -1 && current < newBarsValues[j]) {
            animationStates.push({ op: 'compare', barsIdxs: [j] });
            animationStates.push({ op: 'swap', barsIdxs: [j + 1, j] });
            newBarsValues[j + 1] = newBarsValues[j];
            j--;
        }

        newBarsValues[j + 1] = current;

        animationStates.push({ op: 'sort', barsIdxs: [i] });
    }

    return [animationStates, newBarsValues];
}

export default InsertionSort;
   