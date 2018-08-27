import { PhysiognomyTestModule } from './physiognomy-test.module';

describe('PhysiognomyTestModule', () => {
  let physiognomyTestModule: PhysiognomyTestModule;

  beforeEach(() => {
    physiognomyTestModule = new PhysiognomyTestModule();
  });

  it('should create an instance', () => {
    expect(physiognomyTestModule).toBeTruthy();
  });
});
