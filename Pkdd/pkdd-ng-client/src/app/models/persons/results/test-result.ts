import { LuscherResult } from './luscher-result';
import { MmpiResult } from './mmpi-result';
import { PhysiognomyResult } from './physiognomy-result';
import { PkddUser } from '../../auth/pkdd-user';

export class TestResult {
    public mmpi: MmpiResult;
    public mmpiComplete: boolean;
    public luscher: LuscherResult;
    public luscherComplete: boolean;
    public physiognomy: PhysiognomyResult;
    public physiognomyComplete: boolean;
    public comment: string;
    public userInfo: PkddUser;
}
