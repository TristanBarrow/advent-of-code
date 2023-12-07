import { Runner } from "./util/Runner";

const runner = new Runner();
let success = true;
for (let i = 1; i <= 25; i++) {
    const day = require(`./src/day${i}`);
    success = await runner.run(day.part1, i, 1);
    if (!success) break;
    success = await runner.run(day.part2, i, 2);
    if (!success) break;
}

if (success) console.log("!!!SUCCESS!!!");
else console.error("!!!FAILURE!!!");
