const sumSnacks = (arr: string[]): number[] => {
    return arr.map((items) =>
        parseInt(
            items.split("\n").reduce((a: string, b: string) => {
                return `${parseInt(a) + parseInt(b)}`;
            })
        )
    );
};

const elfWithMostCalories = (snacks: number[]) => {
    return snacks.reduce((a: number, b: number) => (a > b ? a : b));
};

export const part1 = (input: string): string => {
    const arr = input.split("\n\n");
    const summedSnacks = sumSnacks(arr);
    const elf = elfWithMostCalories(summedSnacks);
    return elf.toString();
};

const getCalAndNewArr = (summedSnacks: number[]) => {
    const cal = elfWithMostCalories(summedSnacks);
    const elfIndex = summedSnacks.indexOf(cal);
    summedSnacks.splice(elfIndex, 1);

    return { cal, newSummedSnacks: summedSnacks };
};

export const part2 = (input: string): string => {
    const arr = input.split("\n\n");
    const summedSnacks1 = sumSnacks(arr);

    const { cal: cal1, newSummedSnacks: summedSnacks2 } =
        getCalAndNewArr(summedSnacks1);
    const { cal: cal2, newSummedSnacks: summedSnacks3 } =
        getCalAndNewArr(summedSnacks2);
    const { cal: cal3 } = getCalAndNewArr(summedSnacks3);

    const sum = cal1 + cal2 + cal3;
    return sum.toString();
};
