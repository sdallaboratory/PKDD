import { MmpiTestModule } from './mmpi-test.module';

describe('MmpiTestModule', () => {
  let mmpiTestModule: MmpiTestModule;

  beforeEach(() => {
    mmpiTestModule = new MmpiTestModule();
  });

  it('should create an instance', () => {
    expect(mmpiTestModule).toBeTruthy();
  });
});
