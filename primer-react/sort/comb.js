//Iterativo
function combSortIterative(arr) {
    let n = arr.length;
    let gap = n;
    let swapped = true;

    while (gap !== 1 || swapped) {
        gap = Math.floor(gap / 1.3) || 1;
        swapped = false;

        for (let i = 0; i < n - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                swapped = true;
            }
        }
    }
    return arr;
}

//Recursivo
function combSortRecursive(arr, gap = arr.length, swapped = true) {
    if (gap === 1 && !swapped) return arr;

    gap = Math.floor(gap / 1.3) || 1;
    swapped = false;

    for (let i = 0; i < arr.length - gap; i++) {
        if (arr[i] > arr[i + gap]) {
            [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
            swapped = true;
        }
    }

    return combSortRecursive(arr, gap, swapped);
}
