type lineType = "seeds" | "map";

const getLineType = (line: string) => {
    if (line.includes("seeds: ")) return "seeds";
    if (line.includes("map")) return "map";
};

export const part1 = (input: string): string => {
    return "";
};

export const part2 = (input: string): string => {
    return "_";
};
