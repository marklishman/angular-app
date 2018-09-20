import { HttpCrudService } from './http-crud.service';
import { Observable } from 'rxjs';
import { Identifiable } from '../model/identifiable';

export interface TestDto extends Identifiable<number> {
  name: string;
  email: string;
}

class UserTest extends HttpCrudService<TestDto, number> {
  url = 'https://jsonplaceholder.typicode.com/users';
}

describe('HttpCrudService', () => {

  it('should instantiate the object', () => {

    const test = new UserTest(null);

    const testDtos: Observable<TestDto[]> = test.getList$();
    const testDto: Observable<TestDto> = test.getById$(123);
    const createdDto: Observable<TestDto> = test.create$({} as TestDto);
    const updatedDto: Observable<TestDto> = test.update$({} as TestDto);
    const savedDto: Observable<TestDto> = test.save$({} as TestDto);
    const deletedDto: Observable<TestDto> = test.delete$(456);

  });
});
