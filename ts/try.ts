const day = process.argv[2].substring(4);
const part = process.argv[3].substring(5);
if (!day) throw "Day is a required param";
if (!part) throw "Part is a required param";

const m = require(`./src/day${day}`);
if (!m) throw "day not recognized";

const input = await Bun.file("../input.txt").text();
let output = null;

if (part === "1") output = m.part1(input);
else if (part === "2") output = m.part2(input);
else throw "part not recognized";

console.log("OUTPUT: ", output);
