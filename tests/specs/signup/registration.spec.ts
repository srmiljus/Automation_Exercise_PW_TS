import { test, expect } from '../../fixtures/base.fixture';
import { URLS } from '../../constants/urls';
import { MESSAGES } from '../../constants/messages';
import testData from '../../../testData.json';

test.describe('User Registration', () => {
  test('Successful User Registration @smoke @regression', async ({
    pageManager: { HomePage, LoginPage, SignupPage, AccountCreatedPage },
    userData,
  }) => {
    await HomePage.goToLoginSignup();

    await LoginPage.enterSignupName(userData.name);
    await LoginPage.enterSignupEmail(userData.email);
    await LoginPage.clickSignupButton();

    await expect(SignupPage.getCurrentUrl()).resolves.toBe(URLS.SIGNUP);

    await SignupPage.fillRegistrationForm(testData.user);

    const titleMessage = await AccountCreatedPage.getAccountCreatedMessage();
    expect(titleMessage).toContain(MESSAGES.ACCOUNT_CREATED);

    await AccountCreatedPage.clickContinue();
    await expect(AccountCreatedPage.getCurrentUrl()).resolves.toBe(URLS.HOME);

    const isVisible = await HomePage.isUserLoggedIn(userData.name);
    expect(isVisible).toBeTruthy();
  });
});