export interface LuscherResult {
    grey: number;
    pink: number;
    black: number;
    yellow: number;
    green: number;
    blue: number;
    red: number;
    brown: number;
}

export type ColorName = keyof LuscherResult;
