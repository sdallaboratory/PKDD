export interface PhysiognomyResult {
    group1: number;
    group2: number;
    group3: number;
    group4: number;
    group5: number;
    group6: number;
    group7: number;
    group8: number;
    group9: number;
    group10: number;
    group11: number;
    group12: number;
}

export type Group = keyof PhysiognomyResult;

export const emptyPhysiognomyResult = {
    group1: 0,
    group2: 0,
    group3: 0,
    group4: 0,
    group5: 0,
    group6: 0,
    group7: 0,
    group8: 0,
    group9: 0,
    group10: 0,
    group11: 0,
    group12: 0,
}
