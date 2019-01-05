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
* The server data structures may not be in the best format for use by the client domain model.
* Interfaces avoid the loss of methods when creating objects from a `get` request.

However, this requires some conversion to and from the DTOs. Let's see how to do this.

### Domain

The domain model on the client separates the data and behavior as follows

```typescript
export interface CompanyData {
  readonly name: string;
  readonly catchPhrase: string;
  readonly bs: string;
}

export interface Company extends CompanyData {}

export class Company {
  constructor(data: CompanyData) {
    return Object.assign(this, data);
  }

  static fromDto(companyDto: CompanyDto): Company {
    if (!companyDto) { return }
    return new Company(companyDto);
  }
}
```

`CompanyData` represents the data and the `Company` class defines the behavior. 
TypeScript declaration merging on `Company` brings the two together.

### The DTO

The `Company` DTO is the same as the domain so we can just define it like this.

    export interface CompanyDto extends CompanyData {}
    
Other DTOs are different from their domain counterparts so they are defined explicitly.

```typescript
export interface GeoLocationDto {
  readonly lat: string;
  readonly lng: string;
}
```

### Converters

Next we add `fromDto` and `toDto` methods to the domain classes.

```typescript
static fromDto(companyDto: CompanyDto): Company {
  if (!companyDto) { return }
  return new Company(companyDto);
}
```

We can convert a data type.

```typescript
static fromDto(geoLocationDto: GeoLocationDto): GeoLocation {
  if (!geoLocationDto) { return }
  return new GeoLocation({
    //  DTO converter: change the data type
    lat: parseFloat(geoLocationDto.lat),
    lng: parseFloat(geoLocationDto.lng)
  });
```

We can build nested structures.

```typescript
  static fromDto(addressDto: AddressDto): Address {
    if (!addressDto) { return }
    const geo = GeoLocation.fromDto(addressDto.geo);
    const data = Object.assign(addressDto, { geo });
    return new Address(data);
  }
```

We can rename properties.

```typescript
static fromDto(userDto: UserDto): User {
  if (!userDto) { return }

  // Drop 'username' and 'name'
  const {username, name, ...keep} = userDto;

  // Rename 'username' and 'name' to 'userName' and 'fullName'
  const rename = {
    userName: userDto.username,
    fullName: userDto.name
  };

  // Instantiate 'address' and 'company' as objects
  const nested = {
    address: Address.fromDto(userDto.address),
    company: Company.fromDto(userDto.company)
  };

  const data = Object.assign(
    {},
    keep,
    rename,
    nested
  );

  return new User(data);
}
```
