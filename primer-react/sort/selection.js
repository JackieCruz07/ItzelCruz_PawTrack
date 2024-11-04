//Iterativo
function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
}

//Recursivo
function selectionSortRecur(arr, i = 0) {
    if (i === arr.length) return;
    
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
            minIdx = j;
        }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

    selectionSortRecur(arr, i + 1);
}
