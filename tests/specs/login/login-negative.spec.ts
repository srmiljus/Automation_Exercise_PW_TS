import { test, expect } from '../../fixtures/base.fixture';
import { INVALID_USER } from '../../constants/invalidUser';
import { MESSAGES } from '../../constants/messages';


test.describe('Invalid User Login', () => {
  test('Should show error message for invalid login credentials @negative @regression', async ({ pageManager: { HomePage, LoginPage } }) => {
    await HomePage.goToLoginSignup();

    await LoginPage.enterLoginEmail(INVALID_USER.EMAIL);
    await LoginPage.enterLoginPassword(INVALID_USER.PASSWORD);
    await LoginPage.clickLogin();

    await expect(LoginPage.getLoginErrorLocator()).toBeVisible();
    await expect(LoginPage.getLoginErrorLocator()).toHaveText(MESSAGES.INVALID_LOGIN);
  });
});