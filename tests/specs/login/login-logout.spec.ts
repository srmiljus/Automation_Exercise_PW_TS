import { test, expect } from '../../fixtures/base.fixture';
import { createUserViaApi } from '../../../utils/userApiHelper';

test.beforeEach(async ({ request, userData }) => {
  await createUserViaApi(request, userData);
});

test('Successful User Login via API-created user @smoke @regression', async ({
  pageManager: { HomePage, LoginPage },
  userData
}) => {
  await HomePage.goToLoginSignup();

  await LoginPage.enterLoginEmail(userData.email);
  await LoginPage.enterLoginPassword(userData.password);
  await LoginPage.clickLogin();

  const isVisible = await HomePage.isUserLoggedIn(userData.name);
  expect(isVisible).toBeTruthy();

  await HomePage.clickNavigationLink('Logout');
  const loginVisible = await HomePage.isLoginLinkVisible();
  expect(loginVisible).toBeTruthy();
});