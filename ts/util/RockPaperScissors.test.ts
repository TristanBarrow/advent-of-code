import { describe, expect, it } from "bun:test";
import { playRPSRound } from "./RockPaperScissors";

describe("RPS Round", () => {
    it("gets paper - rock game right", () => {
        const result = playRPSRound("paper", "rock");
        expect(result.winner).toEqual("P1");
    });
    it("gets rock - scissors game right", () => {
        const result = playRPSRound("rock", "scissors");
        expect(result.winner).toEqual("P1");
    });
    it("gets scissors - paper game right", () => {
        const result = playRPSRound("scissors", "paper");
        expect(result.winner).toEqual("P1");
    });

    it("gets rock - paper game right", () => {
        const result = playRPSRound("rock", "paper");
        expect(result.winner).toEqual("P2");
    });
    it("gets rock - scissors game right", () => {
        const result = playRPSRound("scissors", "rock");
        expect(result.winner).toEqual("P2");
    });
    it("gets scissors - paper game right", () => {
        const result = playRPSRound("paper", "scissors");
        expect(result.winner).toEqual("P2");
    });

    it("gets paper - paper game right", () => {
        const result = playRPSRound("paper", "paper");
        expect(result.winner).toEqual("TIE");
    });
    it("gets paper - paper game right", () => {
        const result = playRPSRound("rock", "rock");
        expect(result.winner).toEqual("TIE");
    });
    it("gets paper - paper game right", () => {
        const result = playRPSRound("scissors", "scissors");
        expect(result.winner).toEqual("TIE");
    });
});
