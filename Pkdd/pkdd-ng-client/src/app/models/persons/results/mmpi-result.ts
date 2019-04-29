import { MmpiResultNames, LocaleName } from './mmpi-result-names';

export class MmpiResult {
    constructor(
        public hypochondriasis: number = 0,
        public depression: number = 0,
        public hysteria: number = 0,
        public psychopathia: number = 0,
        public masculinity: number = 0,
        public paranoia: number = 0,
        public psychasthenia: number = 0,
        public schizophrenia: number = 0,
        public hypomania: number = 0,
        public sociality: number = 0,
    ) { }

    public static get keys(): (keyof MmpiResult)[] {
        return Object.keys(new MmpiResult()) as (keyof MmpiResult)[];
    }

    public static toNameValuePairs(mmpiResult: MmpiResult): { name: keyof MmpiResult, value: number }[] {
        return mmpiResult && MmpiResult.keys.map(key => ({ name: key, value: mmpiResult[key] }));
    }

    public static toArray(mmpiResult: MmpiResult): number[] {
        return mmpiResult && MmpiResult.toNameValuePairs(mmpiResult).map(pair => pair.value);
    }

    public static fromArray(values: number[]): MmpiResult {
        const mmpiResult = new MmpiResult();
        MmpiResult.keys.forEach((name, i) => mmpiResult[name] = values[i]);
        return mmpiResult;
    }
}
