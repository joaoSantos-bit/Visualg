import React, { useCallback, useEffect, useState, useMemo } from 'react';

import { generateBarsValues, generateSortedStatusBarsArray } from '../../Helpers';

import BubbleSort from '../../Algorithms/Sorting/BubbleSort';
import MergeSort from '../../Algorithms/Sorting/MergeSort';
import InsertionSort from '../../Algorithms/Sorting/InsertionSort';
import QuickSort from '../../Algorithms/Sorting/QuickSort';
import HeapSort from '../../Algorithms/Sorting/HeapSort';

import BarsContainer from './BarsContainer';
import TopNavigation from './TopNavigation';

const animationDelay = 0.005;
const amountOfBars = 200;
const maxValue = 150;
const minValue = 5;

const colors = {
    base: '#DBD4D3',
    swapping: '#757780',
    sorted: '#387780'
};

const heightFirstContainer = '100px';
const heightContainer = `calc(98vh - ${heightFirstContainer}`;

const algorithms = {
    'bs': { name: 'Bubble Sort', run: barsValues => BubbleSort(barsValues) },
    'is': { name: 'Insertion Sort', run: barsValues => InsertionSort(barsValues) },
    'qs': { name: 'Quick Sort', run: barsValues => QuickSort(barsValues) },
    'hs': { name: 'Heap Sort', run: barsValues => HeapSort(barsValues) } ,
    'ms': { name: 'Merge Sort', run: barsValues => MergeSort(barsValues) }
};

const Simulalg = () => {
    const [barsValues, setBarsValues] = useState(generateBarsValues(maxValue, minValue, amountOfBars));
    const [running, setRunning] = useState(false);
    const [currAlgorithm, setCurrAlgorithm] = useState(null);
    let sortedStatusBars = generateSortedStatusBarsArray(amountOfBars);

    const operations = useMemo(() => ({
        compare: { 
            run: animation => {
                const barsIdxs = animation.barsIdxs;
                const barsDOM = barsIdxs.map(barIdx => document.getElementById(barIdx));
                barsDOM.forEach(barDOM => barDOM.style.backgroundColor = colors.swapping);
                setTimeout(() => {
                    barsDOM.forEach((barDOM, index) => barDOM.style.backgroundColor = sortedStatusBars[barsIdxs[index]] ? colors.sorted : colors.base);
                }, animationDelay * 1000);
            }
        },
        swap: {
            run: animation => {
                const barsIdxs = animation.barsIdxs;
                const [barDOM1, barDOM2] = barsIdxs.map(barIdx => document.getElementById(barIdx));
                const tmpBarHeight = barDOM1.style.height;
                barDOM1.style.height = barDOM2.style.height;
                barDOM2.style.height = tmpBarHeight;
            }
        },
        sort: {
            run: animation => {
                const barsIdxs = animation.barsIdxs;
                const barDOM = document.getElementById(barsIdxs[0]);
                barDOM.style.backgroundColor = colors.sorted;
                sortedStatusBars[barsIdxs[0]] = true;
            }
        },
        override: {
            run: animation => {
                const barsDOM = document.getElementsByClassName('bar');
                barsDOM[animation.barIdx].style.height = `calc((100% / ${maxValue}) * ${animation.value})`
            }
        }
    }), [sortedStatusBars]);

    const resetBars = () => {
        document.location.reload(true);
    };

    const doAnimations = useCallback((animations, newBarsValues) => {
        (async() => { 
            animations.forEach((animation, index) => {
                setTimeout(() => {
                    if (operations[animation.op]) operations[animation.op].run(animation);

                    setTimeout(() => {
                        if (index === animations.length - 1) setBarsValues(newBarsValues);
                    }, animationDelay * 1000); 
                }, animationDelay * index * 1000); 
            });
        
            // sleep function
            await new Promise(r => setTimeout(r, animations.length * 1000 * animationDelay));
        })();
    }, [operations]);
    
    useEffect(() => {
        const runAlgoritm = async () => {
            setRunning(true);
            let [animationStates, newBarsValues] = algorithms[currAlgorithm].run(barsValues);
            await doAnimations(animationStates, newBarsValues);
            setCurrAlgorithm(null);
        };

        if (currAlgorithm) (async () => runAlgoritm())();
    }, [currAlgorithm, barsValues, doAnimations]);

    return (
        <div className='App'>
            <TopNavigation
                heightFirstContainer={ heightFirstContainer } 
                algorithms={ algorithms }
                onAlgorithmChange={setCurrAlgorithm}
                onResetBars={resetBars}
                running={running}
            />
            <BarsContainer
                heightContainer={heightContainer}
                barsValues={barsValues}
                maxValue={maxValue}
                color={colors.base}
            /> 
        </div>
    );
};

export default Simulalg;