import { RPSThrow, playRPSRound } from "../util/RockPaperScissors";
/*

A: Rock
B: Paper
C: Scissors

X: Rock
Y: Paper
Z: Scissors

Round Rules: 

Shape you select: 
Rock: 1
Paper: 2
Scissors: 3



*/

const decoder: { [key: string]: RPSThrow } = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors",
};

const decodeGame = (encryptedThrow: string) => {
    return decoder[encryptedThrow];
};

const splitRounds = (input: string) => {
    return input.split("\n").map((game) => game.split(" "));
};

const calculateRound = (round: RPSThrow[]) => {
    const winner = playRPSRound(round[0], round[1]).winner;
    let winnerValue = 0;
    if (winner === "TIE") winnerValue = 3;
    if (winner === "P2") winnerValue = 6;

    let throwValue = 0;
    if (round[1] === "rock") throwValue = 1;
    if (round[1] === "paper") throwValue = 2;
    if (round[1] === "scissors") throwValue = 3;

    return winnerValue + throwValue;
};

export const part1 = (input: string): string => {
    const rounds = splitRounds(input);
    const decodedRounds = rounds.map((round) => [
        decodeGame(round[0]),
        decodeGame(round[1]),
    ]);

    const playedRounds = decodedRounds.map(calculateRound);
    const sum = playedRounds.reduce((a, b) => a + b);

    return sum.toString();
};

export const part2 = (input: string): string => {
    const rounds = splitRounds(input);
    const decodedRounds = rounds.map((round) => [
        decodeGame(round[0]),
        decodeGame(round[1]),
    ]);

    const playedRounds = decodedRounds.map(calculateRound);
    const sum = playedRounds.reduce((a, b) => a + b);

    return sum.toString();
};
