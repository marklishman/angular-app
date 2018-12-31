# Angular App

An angular application which maintains test data from JSONPlaceholder.

# Repositories

~~~typescript
@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends HttpCrudService<UserDto, number> {

  constructor(httpClient: HttpClient) {
    super('users', httpClient);
  }
}
~~~
