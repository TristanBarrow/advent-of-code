const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

type Color = "red" | "green" | "blue";
type ColorResult = {
    color: Color;
    amount: number;
};
type Round = {
    colorResults: ColorResult[];
};
type Game = {
    gameName: string;
    rounds: WrappedRound[];
};
class WrappedRound {
    private round: Round;
    constructor(round: Round) {
        this.round = round;
    }
    getAmountByColor = (color: Color) => {
        const filteredRounds = this.round.colorResults.filter((res) => res.color === color);
        if (filteredRounds.length === 0) return 0;
        else return filteredRounds[0].amount;
    };
}
class WrappedGame {
    private game: Game;
    constructor(game: Game) {
        this.game = game;
    }
    maxAmountByColor = (color: Color) => {
        return this.game.rounds.map((r) => r.getAmountByColor(color)).reduce((a, b) => (a > b ? a : b));
    };

    getIdAsNumber = () => {
        return parseInt(this.game.gameName.split(" ")[1]);
    };
    isPossible() {
        const red = this.maxAmountByColor("red");
        if (red > MAX_RED_CUBES) return false;

        const green = this.maxAmountByColor("green");
        if (green > MAX_GREEN_CUBES) return false;

        const blue = this.maxAmountByColor("blue");
        if (blue > MAX_BLUE_CUBES) return false;

        return true;
    }
}
const parseGames = (input: string) => {
    const rawGames = input.split("\n").map((line) => line.split(": "));
    return rawGames.map((game): WrappedGame => {
        const gameContent = game[1];
        const g = {
            gameName: game[0],
            rounds: gameContent.split("; ").map(
                (round): WrappedRound =>
                    new WrappedRound({
                        colorResults: round.split(", ").map((colorResult): ColorResult => {
                            const s = colorResult.split(" ");
                            return {
                                color: s[1] as Color,
                                amount: parseInt(s[0]),
                            };
                        }),
                    }),
            ),
        };
        return new WrappedGame(g);
    });
};

export const part1 = (input: string): string => {
    const games = parseGames(input);
    const value = games
        .filter((game) => game.isPossible())
        .map((game) => game.getIdAsNumber())
        .reduce((a, b) => a + b);

    return value.toString();
};

export const part2 = (input: string): string => {
    const games = parseGames(input);
    const result = games
        .map((game) => {
            return game.maxAmountByColor("red") * game.maxAmountByColor("green") * game.maxAmountByColor("blue");
        })
        .reduce((a, b) => a + b);
    return result.toString();
};
