const calculateIncreases = (arr: number[]) => {
    if (arr.length < 2) return 0;
    const val = arr.map((item: number, index: number, fullArray: number[]): number => {
        if (index !== 0 && item > fullArray[index-1]) return 1;
        return 0;
    }).reduce((a, b) => (a + b));
    return val;
}

export const calculateIncreasesAndDecreases = (arr: number[]) => {
    const increase = calculateIncreases(arr);
    let decrease = (arr.length - 1) - increase;
    if (arr.length === 0) decrease = 0;
    return {
        increase,
        decrease,
    }
}