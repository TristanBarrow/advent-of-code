export class Runner {
    private getInput = async (day: number, part: number) => {
        const path = `../../input/day${day}_part${part}.txt`;
        return await Bun.file(path).text();
    };

    private printOut = async (data: string, day: number, part: number) => {
        const path = `../../output/day${day}_part${part}.txt`;
        await Bun.write(path, data);
    };

    async run(f: (input: string) => string, day: number, part: number) {
        const input = await this.getInput(day, part);
        const output = f(input);
        await this.printOut(output, day, part);
    }
}
