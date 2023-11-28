import { Runner } from "./util/Runner";

const runner = new Runner();

for (let i = 1; i <= 25; i++) {
    const day = require(`./src/day${i}`);
    runner.run(day.part1, i, 1);
    runner.run(day.part2, i, 2);
}
