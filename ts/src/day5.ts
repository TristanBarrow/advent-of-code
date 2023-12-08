class MapLayer {
    private destStart: number;
    private sourceStart: number;
    private size: number;
    constructor(layerInput: string) {
        const l = layerInput.split(" ");
        this.destStart = parseInt(l[0]);
        this.sourceStart = parseInt(l[1]);
        this.size = parseInt(l[2]);
        if (isNaN(this.destStart)) throw Error(`Parsing layer failed with "${layerInput}"`);
        if (isNaN(this.sourceStart)) throw Error(`Parsing layer failed with "${layerInput}"`);
        if (isNaN(this.size)) throw Error(`Parsing layer failed with "${layerInput}"`);
    }
    isInLayer(num: number) {
        return num >= this.sourceStart && num < this.sourceStart + this.size;
    }
    useLayer(num: number) {
        return num - this.sourceStart + this.destStart;
    }
}

class DataMap {
    from: string;
    to: string;
    private layers: MapLayer[] = [];
    constructor(input: string) {
        const parsed = input.split("\n");
        this.from = parsed[0].split("-")[0];
        this.to = parsed[0].split("-")[2].split(" ")[0];
        for (let i = 1; i < parsed.length; i++) {
            this.layers.push(new MapLayer(parsed[i]));
        }
    }
    translate(num: number) {
        const filtered = this.layers.filter((m) => m.isInLayer(num));
        if (filtered.length === 0) return num;
        return filtered[0].useLayer(num);
    }
}

let seeds: number[] = [];

const parseDataMaps = (input: string): DataMap[] => {
    const lines = input.split("\n\n");
    seeds = lines[0]
        .split(": ")[1]
        .split(" ")
        .map((n) => parseInt(n));

    return lines.filter((line) => !line.includes("seeds:")).map((line) => new DataMap(line));
};

const runSeed = (seed: number, maps: DataMap[]) => {
    let tmp = seed;
    for (let i = 0; i < maps.length; i++) {
        tmp = maps[i].translate(tmp);
    }
    return tmp;
};

export const part1 = (input: string): string => {
    const maps = parseDataMaps(input);
    const locations = seeds.map((seed) => runSeed(seed, maps));
    const result = locations.reduce((a, b) => (a < b ? a : b));
    return result.toString();
};

export const part2 = (input: string): string => {
    return "_";
};
