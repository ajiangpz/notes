function quickSort(array, leftIndex = 0, rightIndex = array.length - 1) {
  const partitionArray = function (leftIndex, rightIndex) {
    const swap = function (leftIndex, rightIndex) {
      let tmp = array[leftIndex];
      array[leftIndex] = array[rightIndex];
      array[rightIndex] = tmp;
    };
    let parttionIndex = leftIndex,
      flag = array[rightIndex];
    for (
      let currentIndex = leftIndex;
      currentIndex < rightIndex;
      currentIndex++
    ) {
      if (array[currentIndex] < flag) {
        swap(parttionIndex, currentIndex);
        parttionIndex++;
      }
    }
    swap(parttionIndex, rightIndex);
    return parttionIndex;
  };
  if (leftIndex < rightIndex) {
    let parttionIndex = partitionArray(leftIndex, rightIndex);
    quickSort(array, leftIndex, parttionIndex - 1);
    quickSort(array, parttionIndex + 1, rightIndex);
    return array;
  }
}