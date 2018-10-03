import { PersonsRoutingModule } from './persons-routing.module';

describe('PersonsRoutingModule', () => {
  let personsRoutingModule: PersonsRoutingModule;

  beforeEach(() => {
    personsRoutingModule = new PersonsRoutingModule();
  });

  it('should create an instance', () => {
    expect(personsRoutingModule).toBeTruthy();
  });
});
