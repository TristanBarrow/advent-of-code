import { readFileSync } from 'fs';
import { calculateIncreasesAndDecreases } from "./calculateIncreasesAndDecreases";

const input = readFileSync(__dirname + '/input.txt').toString().split('\n').map(str => parseInt(str));

const output = calculateIncreasesAndDecreases(input);
console.log(output);