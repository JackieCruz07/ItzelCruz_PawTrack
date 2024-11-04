//Iterativo
function bucketSortIterative(arr, bucketSize = 5) {
    if (arr.length === 0) return arr;

    let minValue = Math.min(...arr);
    let maxValue = Math.max(...arr);

    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let buckets = new Array(bucketCount).fill().map(() => []);

    for (let i = 0; i < arr.length; i++) {
        let bucketIndex = Math.floor((arr[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }

    // Ordenar cada bucket y concatenar
    let sortedArray = [];
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].sort((a, b) => a - b);
        sortedArray = sortedArray.concat(buckets[i]);
    }

    return sortedArray;
}

//Recursivo
function bucketSortRecursive(arr, bucketSize = 5) {
    if (arr.length <= 1) return arr;

    let minValue = Math.min(...arr);
    let maxValue = Math.max(...arr);

    // Inicializar los buckets
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let buckets = new Array(bucketCount).fill().map(() => []);

    // Distribuir los elementos en los buckets
    for (let i = 0; i < arr.length; i++) {
        let bucketIndex = Math.floor((arr[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }

    // Ordenar recursivamente cada bucket y concatenar
    let sortedArray = [];
    for (let i = 0; i < buckets.length; i++) {
        sortedArray = sortedArray.concat(bucketSortRecursive(buckets[i], bucketSize));
    }

    return sortedArray;
}
