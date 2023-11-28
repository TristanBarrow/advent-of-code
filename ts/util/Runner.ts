export class Runner {
    private getInput = async (day: number, part: number) => {
        const path = `../input/day${day}-part${part}.txt`;
        return await Bun.file(path).text();
    };

    private getOutput = async (day: number, part: number) => {
        const path = `../output/day${day}-part${part}.txt`;
        return await Bun.file(path).text();
    };

    async run(
        f: (input: string) => string,
        day: number,
        part: number
    ): Promise<boolean> {
        const input = await this.getInput(day, part);
        const expectedOutput = await this.getOutput(day, part);
        const actualOutput = f(input);
        if (expectedOutput !== actualOutput) {
            console.error(`FAIL on Day ${day} Part ${part}:`);
            console.error(`Expected: ${expectedOutput}`);
            console.error(`Got: ${actualOutput}`);
            return false;
        }
        return true;
    }
}
