const generateBarsValues = (max, min, amount) => {
    let values = [];

    for (let i = 0; i < amount; i++) {
        values.push(Math.floor(Math.random() * (max - min) + min));
    }

    return values;
};

const generateSortedStatusBarsArray = size => {
    let arr = [];

    for (let i = 0; i < size; i++) arr.push(false)

    return arr;
}

export { generateBarsValues, generateSortedStatusBarsArray };