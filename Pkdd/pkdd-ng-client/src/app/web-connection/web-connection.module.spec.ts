import { WebConnectionModule } from './web-connection.module';

describe('WebConnectionModule', () => {
  let webConnectionModule: WebConnectionModule;

  beforeEach(() => {
    webConnectionModule = new WebConnectionModule();
  });

  it('should create an instance', () => {
    expect(webConnectionModule).toBeTruthy();
  });
});
