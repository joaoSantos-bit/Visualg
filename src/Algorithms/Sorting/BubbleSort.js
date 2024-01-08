const BubbleSort = barsValues => {
    let newBarsValues = [...barsValues];
    let animationStates = [];
    
    for (let j = 0; j < newBarsValues.length; j++) {
        for (let i = 0; i < newBarsValues.length - j - 1; i++) {
            animationStates.push({ op: 'compare', barsIdxs: [i, i + 1] });

            if (newBarsValues[i] > newBarsValues[i + 1]) {              
                let tmp = newBarsValues[i];
                newBarsValues[i] = newBarsValues[i + 1];
                newBarsValues[i + 1] = tmp;

                animationStates.push({ op: 'swap', barsIdxs: [i, i + 1] });
            }
        }
        
        animationStates.push({ op: 'sort', barsIdxs: [newBarsValues.length - j - 1] });
    }

    return [animationStates, newBarsValues];
};

export default BubbleSort;