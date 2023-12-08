type Category = "digit" | "blank" | "gear" | "symbol" | "out-of-bounds";

class Part {
    private value: number;
    private start: Location;
    private end: Location;
    constructor(value: number, start: Location | null, end: Location | null) {
        if (start === null) throw new Error("Start cannot be null");
        if (end === null) throw new Error("End cannot be null");
        if (start.vertical !== end.vertical)
            throw new Error("start and end must be on the same line");
        this.value = value;
        this.start = start;
        this.end = end;
    }
    partIsOnLocation(location: Location) {
        if (location.vertical !== this.start.vertical) return false;
        return (
            this.start.horizontal <= location.horizontal &&
            this.end.horizontal >= location.horizontal
        );
    }
    getUID() {
        return `${this.start.vertical}_${this.start.horizontal}`;
    }
}

const getPartId = () => {};

class PartCatalog {
    private parts: Part[] = [];
    add(part: Part) {
        this.parts.push(part);
    }
    getPartByLocation(location: Location): Part | null {
        return (
            this.parts.find((part) => part.partIsOnLocation(location)) || null
        );
    }
}
type Location = {
    horizontal: number;
    vertical: number;
};

const Loc = (vertical: number, horizontal: number): Location => ({
    horizontal,
    vertical,
});

type SchemeValue = {
    value: string | null;
    category: Category;
};

type SchemeAction = (sv: SchemeValue, location: Location) => void;

const nilSchemeValue: SchemeValue = {
    value: null,
    category: "out-of-bounds",
};
class Schematic {
    private data: string[];
    constructor(data: string[]) {
        this.data = data;
    }
    private getCategoryFromValue(value: string): Category {
        if (value === ".") return "blank";
        if (value === "*") return "gear";
        if (/^[0-9]{1}$/.test(value)) return "digit";
        if (/^.$/.test(value)) return "symbol";
        throw Error(`Cannot categorize value: ${value}`);
    }
    locationIsNearSymbol(location: Location) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const testLoc = Loc(
                    location.vertical + i,
                    location.horizontal + j
                );
                const category = this.getValue(testLoc).category;
                if (category === "symbol" || category === "gear") return true;
            }
        }
        return false;
    }

    getValue(location: Location): SchemeValue {
        if (location.vertical < 0 || location.vertical >= this.data.length)
            return nilSchemeValue;
        if (
            location.horizontal < 0 ||
            location.horizontal >= this.data[location.vertical].length
        )
            return nilSchemeValue;
        const value = this.data[location.vertical][location.horizontal];

        return {
            value,
            category: this.getCategoryFromValue(value),
        };
    }
    isStartOfNumber(location: Location) {
        const current = this.getValue(location);
        const prevLoc = Loc(location.vertical, location.horizontal - 1);
        const prev = this.getValue(prevLoc);
        return current.category === "digit" && prev.category !== "digit";
    }
    isEndOfNumber(location: Location) {
        const current = this.getValue(location);
        const nextLoc = Loc(location.vertical, location.horizontal + 1);
        const next = this.getValue(nextLoc);
        return current.category === "digit" && next.category !== "digit";
    }
    forEachNeighbor(location: Location, action: (l: Location) => void) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                action(Loc(location.vertical + i, location.horizontal + j));
            }
        }
    }
    forEach(action: SchemeAction) {
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].length; j++) {
                const loc = Loc(i, j);
                action(this.getValue(loc), loc);
            }
        }
    }
}

const parseBuffer = (_buffer: SchemeValue[]) => {
    return parseInt(_buffer.map((e) => e.value).join(""));
};

export const part1 = (input: string): string => {
    const s = new Schematic(input.split("\n"));

    const validNumbers: number[] = [];
    let buffer: SchemeValue[] = [];
    let currentBufferIsValid = false;

    s.forEach((entry, location) => {
        if (entry.category === "digit") {
            buffer.push(entry);
            if (s.locationIsNearSymbol(location)) {
                currentBufferIsValid = true;
            }
            if (s.isEndOfNumber(location)) {
                if (currentBufferIsValid)
                    validNumbers.push(parseBuffer(buffer));
                buffer = [];
                currentBufferIsValid = false;
            }
        }
    });
    const result = validNumbers.reduce((a, b) => a + b);
    return result.toString();
};

export const part2 = (input: string): string => {
    const s = new Schematic(input.split("\n"));
    const partCatalog = new PartCatalog();
    let buffer: SchemeValue[] = [];
    let start: Location | null = null;

    s.forEach((entry, location) => {
        if (entry.category === "digit") {
            buffer.push(entry);
            if (s.isStartOfNumber(location)) {
                start = location;
            }
            if (s.isEndOfNumber(location)) {
                const n = parseBuffer(buffer);
                const part = new Part(n, start, location);
                partCatalog.add(part);
                buffer = [];
            }
        }
    });
    let gearRatios: number[] = [];
    s.forEach((entry, location) => {
        if (entry.category === "gear") {
            const set = new Set<Part>();
            s.forEachNeighbor(location, (_location) => {
                const part = partCatalog.getPartByLocation(_location);
                if (part) set.add(part);
            });
            if (set.size === 2) {
                const setIt = set.values();
                const v1 = setIt.next().value.value;
                const v2 = setIt.next().value.value;
                gearRatios.push(v1 * v2);
            }
        }
    });
    const result = gearRatios.reduce((a, b) => a + b);
    return result.toString();
};
