export type RPSThrow = "rock" | "paper" | "scissors";

type RPSWinLossResult = "P1" | "P2" | "TIE";

const winnerMap = new Map<RPSThrow, RPSThrow>([
    ["rock", "scissors"],
    ["scissors", "paper"],
    ["paper", "rock"],
]);

export const playRPSRound = (p1: RPSThrow, p2: RPSThrow) => {
    let winner: RPSWinLossResult = "P1";

    if (p1 === p2) winner = "TIE";
    if (winnerMap.get(p2) === p1) winner = "P2";

    return {
        winner,
    };
};
