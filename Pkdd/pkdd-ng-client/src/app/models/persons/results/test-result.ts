import { LuscherResult } from './luscher-result';
import { MmpiResult } from './mmpi-result';
import { PhysiognomyResult } from './physiognomy-result';
import { PkddUser } from '../../auth/pkdd-user';

export interface TestResult {
    mmpi: MmpiResult;
    mmpiComplete: boolean;
    luscher: LuscherResult;
    luscherComplete: boolean;
    physiognomy: PhysiognomyResult;
    physiognomyComplete: boolean;
    comment: string;
    userInfo: PkddUser;
}
