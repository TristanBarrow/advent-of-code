import { diffieHellman } from "crypto";

const getFirstDigit = (line: string) => {
  for (let i = 0; i < line.length; i++) {
    if (`1234567890`.includes(line[i])) {
      return { number: parseInt(line[i]), index: i };
    }
  }
  return { number: 0, index: -1 };
};

const getLastDigit = (line: string): NumTuple => {
  for (let i = line.length - 1; i >= 0; i--) {
    if (`1234567890`.includes(line[i])) {
      return { number: parseInt(line[i]), index: i };
    }
  }
  return { number: 0, index: -1 };
};

const stringNums = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getFirstNumberAsWord = (line: string) => {
  const foundVals = stringNums
    .map((num) => {
      return {
        index: line.indexOf(num),
        number: stringNums.lastIndexOf(num),
      };
    })
    .filter((obj) => obj.index !== -1);
  if (foundVals.length === 0) return { index: -1, number: -1 };
  return foundVals.reduce((a, b) => (a.index < b.index ? a : b));
};

type NumTuple = {
  index: number;
  number: number;
};

const getLastNumberAsWord = (line: string): NumTuple => {
  const foundVals = stringNums
    .map((num): NumTuple => {
      return {
        index: line.lastIndexOf(num),
        number: stringNums.indexOf(num),
      };
    })
    .filter((obj) => obj.index !== -1);
  if (foundVals.length === 0) return { index: -1, number: 0 };

  const redVal = foundVals.reduce((a, b) => (a.index > b.index ? a : b));
  return redVal;
};

export const part1 = (input: string): string => {
  const nums = input
    .split("\n")
    .map((e) =>
      parseInt(`${getFirstDigit(e).number}${getLastDigit(e).number}`),
    );
  return nums.reduce((a, b) => a + b).toString();
};

const getFirstNumberOverAll = (line: string) => {
  const { number: wordNumber, index: wordIndex } = getFirstNumberAsWord(line);
  const { number: digitNumber, index: digitIndex } = getFirstDigit(line);
  if (wordIndex === -1) return digitNumber;
  if (digitIndex === -1) return wordNumber;
  const wordShouldBeUsedForFirst = wordIndex < digitIndex;

  const num = wordShouldBeUsedForFirst ? wordNumber : digitNumber;
  return num;
};

const getLastNumberOverAll = (line: string) => {
  const { number: wordNumber, index: wordIndex } = getLastNumberAsWord(line);
  const { number: digitNumber, index: digitIndex } = getLastDigit(line);

  if (wordIndex === -1) return digitNumber;
  if (digitIndex === -1) return wordNumber;

  if (wordIndex > digitIndex) return wordNumber;
  else return digitNumber;
};

const processLine = (line: string): number => {
  const first = getFirstNumberOverAll(line);
  const last = getLastNumberOverAll(line);
  return parseInt(`${first}${last}`);
};

export const part2 = (input: string): string => {
  const nums = input.split("\n").map(processLine);
  return nums.reduce((a, b) => a + b).toString();
};
