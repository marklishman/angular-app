# Angular App

An angular application which maintains test data from JSONPlaceholder.

# Http Crud Service

This is all that is needed to set up a new Http Crud service.

Similar to a Repository in Spring Data.

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends HttpCrudService<UserDto, number> {

  constructor(httpClient: HttpClient) {
    super('users', httpClient);
  }
  
}
```

# Custom RxJS Operator

Definition

```typescript
export const lowerCaseTrim = () =>
  map((value: string) => value.trim().toLowerCase());
```

Usage

```typescript
    const searchText$ = this.search.valueChanges
      .pipe(
        debounceTime(500),
        lowerCaseTrim(),
        distinctUntilChanged(),
      );
```

# DTOs

DTOs are _interfaces_ which define the structure of the data returned by or sent to the server.

Interfaces (rather than classes) are used for two reasons.
* The server data structures may not be in the best format for use by the client.
* Interfaces avoid the loss of methods when creating objects from a `get` request.

However, this requires some conversion to and from the DTOs.

