import type { APIRequestContext } from '@playwright/test';
import type { UserData } from '../tests/types/user.types';

export async function createUserViaApi(
  request: APIRequestContext,
  userData: UserData
) {
  const response = await request.post('/api/createAccount', {
    multipart: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      title: userData.title,
      birth_date: userData.birthday,
      birth_month: userData.birthmonth,
      birth_year: userData.birthyear,
      firstname: userData.firstName,
      lastname: userData.lastName,
      company: userData.company,
      address1: userData.address,
      address2: userData.address,
      country: userData.country,
      zipcode: userData.zipcode,
      state: userData.state,
      city: userData.city,
      mobile_number: userData.mobileNumber,
    },
  });

  return response;
}

export async function deleteUserViaApi(
  request: APIRequestContext,
  userData: UserData
) {
  const response = await request.delete('/api/deleteAccount', {
    multipart: {
      email: userData.email,
      password: userData.password,
    },
  });

  return response;
}