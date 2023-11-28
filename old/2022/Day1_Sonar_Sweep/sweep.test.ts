import { calculateIncreasesAndDecreases } from "./calculateIncreasesAndDecreases";


describe('Sonar Sweep', () => {
    it('returns zero if array is empty', () => {
        const result = calculateIncreasesAndDecreases([]);
        expect(result.increase).toEqual(0);
        expect(result.decrease).toEqual(0);
    });
    it('returns zero if there is one item in the array', () => {
        const result = calculateIncreasesAndDecreases([1]);
        expect(result.increase).toEqual(0);
        expect(result.decrease).toEqual(0);
    });
    it('returns one increase if two items increase', () => {
        const result = calculateIncreasesAndDecreases([1, 2]);
        expect(result.increase).toEqual(1);
        expect(result.decrease).toEqual(0);
    });
    it('returns zero increase if the items dont increase', () => {
        const result = calculateIncreasesAndDecreases([2, 1]);
        expect(result.increase).toEqual(0);
    });
    it('can handle three items that increase', () => {
        const result = calculateIncreasesAndDecreases([1, 2, 3]);
        expect(result.increase).toEqual(2);
    });
    it('can handle many items', () => {
        const result = calculateIncreasesAndDecreases([1, 3, 2, 4, 5, 2]);
        expect(result.increase).toEqual(3);
    });
    it('can get decreases', () => {
        const result = calculateIncreasesAndDecreases([1, 3, 2, 4, 5, 2]);
        expect(result.decrease).toEqual(2);
    });
});