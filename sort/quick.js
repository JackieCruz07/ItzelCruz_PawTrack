//Iterativo
function quickSortIterative(arr) {
    if (arr.length <= 1) return arr;

    let stack = [];
    stack.push(0);
    stack.push(arr.length - 1);

    while (stack.length) {
        let end = stack.pop();
        let start = stack.pop();

        let pivotIndex = partition(arr, start, end);

        if (pivotIndex - 1 > start) {
            stack.push(start);
            stack.push(pivotIndex - 1);
        }

        if (pivotIndex + 1 < end) {
            stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }

    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

//Recursivo
function quickSort(arr) {
    if (arr.length <= 1) return arr;

    let pivot = arr[Math.floor(arr.length / 2)];
    let left = [];
    let right = [];
    let middle = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i]);
        } else {
            middle.push(arr[i]);
        }
    }

    return quickSort(left).concat(middle).concat(quickSort(right));
}
