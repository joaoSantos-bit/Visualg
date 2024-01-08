const MergeSort = barsValues => {
    const animationStates = [];
    let newBarsVaues = [...barsValues];
    const auxiliaryArray = newBarsVaues.slice();
    
    mergeSortHelper(newBarsVaues, 0, newBarsVaues.length - 1, auxiliaryArray, animationStates);
    
    // include sort animations
    const animationStatesAux1 = animationStates.slice(0, animationStates.length - (barsValues.length * 2));
    const animationStatesAux2 = animationStates.slice(animationStates.length - (barsValues.length * 2) - 1, animationStates.length);

    for (let i = 1, countSplice = 0; i <= barsValues.length; i++, countSplice++) {
        animationStatesAux2.splice(i * 2 + countSplice, 0, { op: 'sort', barsIdxs: [i - 1] });
    }
 
    return [[...animationStatesAux1, ...animationStatesAux2], newBarsVaues];
}
  
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animationStates) {
    if (startIdx === endIdx) return;

    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animationStates);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animationStates);
    merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animationStates);
}
  
function merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animationStates) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        animationStates.push({ op: 'compare', barsIdxs: [i, j] });
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animationStates.push({ op: 'override', barIdx: k, value: auxiliaryArray[i] });
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animationStates.push({ op: 'override', barIdx: k, value: auxiliaryArray[j] });
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIdx) {
        animationStates.push({ op: 'compare', barsIdxs: [i, i] });
        animationStates.push({ op: 'override', barIdx: k, value: auxiliaryArray[i] });
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIdx) {
        animationStates.push({ op: 'compare', barsIdxs: [j, j] });
        animationStates.push({ op: 'override', barIdx: k, value: auxiliaryArray[j] });
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export default MergeSort;