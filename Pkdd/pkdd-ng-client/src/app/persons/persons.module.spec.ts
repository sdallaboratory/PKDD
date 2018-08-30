import { PersonsModule } from './persons.module';

describe('PersonsModule', () => {
  let personsModule: PersonsModule;

  beforeEach(() => {
    personsModule = new PersonsModule();
  });

  it('should create an instance', () => {
    expect(personsModule).toBeTruthy();
  });
});
