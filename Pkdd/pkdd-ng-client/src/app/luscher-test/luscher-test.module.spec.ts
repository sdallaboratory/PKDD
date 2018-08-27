import { LuscherTestModule } from './luscher-test.module';

describe('LuscherTestModule', () => {
  let luscherTestModule: LuscherTestModule;

  beforeEach(() => {
    luscherTestModule = new LuscherTestModule();
  });

  it('should create an instance', () => {
    expect(luscherTestModule).toBeTruthy();
  });
});
