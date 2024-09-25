//Iterativo
function mergeSortIterative(arr) {
    if (arr.length <= 1) return arr;
    
    let width = 1;
    let n = arr.length;

    while (width < n) {
        let left = 0;
        while (left < n) {
            let mid = Math.min(left + width, n);
            let right = Math.min(left + 2 * width, n);
            merge(arr, left, mid, right);
            left += 2 * width;
        }
        width *= 2;
    }

    return arr;
}

function merge(arr, left, mid, right) {
    let leftArr = arr.slice(left, mid);
    let rightArr = arr.slice(mid, right);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }

    while (i < leftArr.length) {
        arr[k++] = leftArr[i++];
    }

    while (j < rightArr.length) {
        arr[k++] = rightArr[j++];
    }
}

//Recursivo
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [], i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}
