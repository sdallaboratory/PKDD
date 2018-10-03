import { LuscherResult } from './luscher-result';
import { MmpiResult } from './mmpi-result';
import { PhysiognomyResult } from './physiognomy-result';

export class Results {
    mmpi: MmpiResult;
    luscher: LuscherResult;
    physiognomy: PhysiognomyResult;
    comment: string;
}
