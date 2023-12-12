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
    isInLayerForward(num: number) {
        return num >= this.sourceStart && num < this.sourceStart + this.size;
    }
    useLayerForward(num: number) {
        return num - this.sourceStart + this.destStart;
    }
    isInLayerBackward(num: number) {
        return num >= this.destStart && num < this.destStart + this.size;
    }
    useLayerBackward(num: number) {
        return num - this.destStart + this.sourceStart;
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
    translateForward(num: number) {
        const filtered = this.layers.filter((m) => m.isInLayerForward(num));
        if (filtered.length === 0) return num;
        return filtered[0].useLayerForward(num);
    }
    translateBackward(num: number) {
        const filtered = this.layers.filter((m) => m.isInLayerBackward(num));
        if (filtered.length === 0) return num;
        return filtered[0].useLayerBackward(num);
    }
}

let seeds: number[] = [];

const isValidSeed = (num: number) => {
    for (let i = 0; i < seeds.length; i += 2) {
        const start = seeds[i];
        const end = start + seeds[i + 1];
        if (num >= start && num < end) return true;
    }
    return false;
};

const parseDataMaps = (input: string): DataMap[] => {
    const lines = input.split("\n\n");
    seeds = lines[0]
        .split(": ")[1]
        .split(" ")
        .map((n) => parseInt(n));

    return lines.filter((line) => !line.includes("seeds:")).map((line) => new DataMap(line));
};

const runSeedForward = (seed: number, maps: DataMap[]) => {
    let tmp = seed;
    for (let i = 0; i < maps.length; i++) {
        tmp = maps[i].translateForward(tmp);
    }
    return tmp;
};

const runSeedBackward = (seed: number, maps: DataMap[]) => {
    let tmp = seed;
    for (let i = maps.length - 1; i >= 0; i--) {
        tmp = maps[i].translateBackward(tmp);
    }
    return tmp;
};

export const part1 = (input: string): string => {
    const maps = parseDataMaps(input);
    const locations = seeds.map((seed) => runSeedForward(seed, maps));
    const result = locations.reduce((a, b) => (a < b ? a : b));
    return result.toString();
};

export const part2 = (input: string): string => {
    const maps = parseDataMaps(input);
    const startTime = Date.now();
    let location = 0;
    while (true) {
        const seed = runSeedBackward(location, maps);
        if (location % 1000000 === 0) console.log(location);
        if (isValidSeed(seed)) break;
        location++;
    }
    const endTime = Date.now();
    console.log((endTime - startTime) / 60000);
    return location.toString();
};
