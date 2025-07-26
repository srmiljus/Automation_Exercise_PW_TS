import type { APIRequestContext } from '@playwright/test';
import testData from '../testData.json';
import type { UserData } from '../tests/types/user.types';

export async function createUserViaApi(
  request: APIRequestContext,
  userData: UserData
) {
  const response = await request.post('/api/createAccount', {
    multipart: {
      name: userData.name,
      email: userData.email,
      password: testData.user.password,
      title: testData.user.title,
      birth_date: testData.user.birthday,
      birth_month: testData.user.birthmonth,
      birth_year: testData.user.birthyear,
      firstname: testData.user.firstName,
      lastname: testData.user.lastName,
      company: testData.user.company,
      address1: testData.user.address,
      address2: testData.user.address,
      country: testData.user.country,
      zipcode: testData.user.zipcode,
      state: testData.user.state,
      city: testData.user.city,
      mobile_number: testData.user.mobileNumber,
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
      password: testData.user.password,
    },
  });

  return response;
}