import { PkddChartsModule } from './pkdd-charts.module';

describe('PkddChartsModule', () => {
  let pkddChartsModule: PkddChartsModule;

  beforeEach(() => {
    pkddChartsModule = new PkddChartsModule();
  });

  it('should create an instance', () => {
    expect(pkddChartsModule).toBeTruthy();
  });
});
