import { UserHttpService } from './user-http.service';

describe('DefaultHttpCrudService', () => {

  it('should instantiate the vehicle http service with the correct entity name', () => {
    const userHttpService = new UserHttpService(null);
    expect(userHttpService.entityName).toBe('users');
  });

});
