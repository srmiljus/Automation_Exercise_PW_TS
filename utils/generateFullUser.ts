import { faker } from '@faker-js/faker';
import type { UserData } from '../tests/types/user.types';

export function generateFullUser(): UserData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const randomNum = faker.number.int({ min: 100, max: 999 });
  const birthDate = faker.date.birthdate({ min: 24, max: 44, mode: 'age' });

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@test.com`,
    password: 'test123',
    title: 'Mr.',
    firstName,
    lastName,
    birthday: birthDate.getDate().toString(),
    birthmonth: birthDate.toLocaleString('default', { month: 'long' }),
    birthyear: birthDate.getFullYear().toString(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    country: 'Canada',
    zipcode: faker.location.zipCode(),
    mobileNumber: '090999000099',
  };
}
