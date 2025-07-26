import { test, expect } from '../../fixtures/base.fixture';
import { EXISTING_USER } from '../../constants/existingUser';
import { MESSAGES } from '../../constants/messages';

test.describe('Signup with Existing User', () => {
  test('Should show error message for already registered email @negative @regression', async ({ pageManager: { HomePage, LoginPage } }) => {
    await HomePage.goToLoginSignup();

    await LoginPage.enterSignupName(EXISTING_USER.NAME);
    await LoginPage.enterSignupEmail(EXISTING_USER.EMAIL);
    await LoginPage.clickSignupButton();

    const errorMessage = LoginPage.signupErrorLocator;
    await expect(errorMessage).toHaveText(MESSAGES.EXISTING_USER_LOGIN);
  });
});