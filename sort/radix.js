//Iterativo
function radixSortIterative(arr) {
    let maxNum = Math.max(...arr) * 10;
    let divisor = 10;

    while (divisor < maxNum) {
        let buckets = [...Array(10)].map(() => []);

        for (let num of arr) {
            buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
        }

        arr = [].concat.apply([], buckets);
        divisor *= 10;
    }

    return arr;
}

//Recursivo
function radixSortRecursive(arr, divisor = 10) {
    if (arr.length <= 1 || Math.max(...arr) < divisor / 10) return arr;

    let buckets = [...Array(10)].map(() => []);

    for (let num of arr) {
        buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
    }

    return [].concat.apply([], buckets.map(bucket => radixSortRecursive(bucket, divisor * 10)));
}
