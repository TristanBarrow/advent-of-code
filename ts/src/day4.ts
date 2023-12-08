class Card {
    private id: string;
    private winners = new Map<number, boolean>();
    private context: number[];
    constructor(line: string) {
        const s1 = line.split("|");
        const contextString = s1[1];
        const s2 = s1[0].split(":");
        const winnersString = s2[1];
        const id = s2[0];
        this.id = id.split(" ")[1];
        winnersString.split(" ").forEach((n) => {
            const parsedN = parseInt(n.trim());
            if (!isNaN(parsedN)) this.winners.set(parsedN, true);
        });
        this.context = contextString
            .split(" ")
            .map((n) => parseInt(n.trim()))
            .filter((n) => !isNaN(n));
    }

    countMatchedNumbers() {
        const count = this.context
            .map((n): number => {
                if (this.winners.get(n) !== undefined) return 1;
                return 0;
            })
            .reduce((a, b) => a + b);
        return count;
    }
    getScore() {
        const count = this.countMatchedNumbers();
        if (count === 0) return 0;
        return Math.pow(2, count - 1);
    }
}

export const part1 = (input: string): string => {
    const lines = input.split("\n");
    return lines
        .map((line) => new Card(line).getScore())
        .reduce((a, b) => a + b)
        .toString();
};

export const part2 = (input: string): string => {
    const lines = input.split("\n");
    const scores = lines.map((line) => new Card(line).countMatchedNumbers());
    const cards = scores.map((n) => ({ val: n, count: 1 }));

    const addCardsForCard = (n: number) => {
        const val = cards[n].val;
        const count = cards[n].count;
        for (let i = 1; i <= val; i++) {
            cards[n + i].count += count;
        }
    };

    for (let i = 0; i < cards.length; i++) {
        addCardsForCard(i);
    }

    return cards
        .map((c) => c.count)
        .reduce((a, b) => a + b)
        .toString();
};
