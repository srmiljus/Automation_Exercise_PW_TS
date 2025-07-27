import { test, expect } from '../../fixtures/base.fixture';
import testData from '../../../testData.json';
import { deleteUserViaApi } from '../../../utils/userApiHelper';
import { URLS } from '../../constants/urls';
import { MESSAGES } from '../../constants/messages';

test('E2E: Register, Add to Cart, Logout & Delete @e2e', async ({
  pageManager: { HomePage, LoginPage, SignupPage, AccountCreatedPage, ProductPage, CartPage },
  request,
  userData
}) => {
 
  await HomePage.open(URLS.HOME);
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
  expect(await HomePage.isUserLoggedIn(userData.name)).toBeTruthy();

  await ProductPage.open(URLS.PRODUCT);
  await ProductPage.enterSearchText('T-Shirt');

  const productVisible = await ProductPage.productItemIsVisible(testData.product.name);
  expect(productVisible).toBeTruthy();

  await ProductPage.clickOnAddToCartButton(testData.product.name);

  expect(await ProductPage.isCartModalVisible()).toBeTruthy();
  expect(await ProductPage.isCartTitleVisible(MESSAGES.ADDED_TO_CART)).toBeTruthy();

  await ProductPage.clickCartLinkButton();
  await CartPage.assertProductDetailsMatch(testData.product);

  await HomePage.clickNavigationLink('Logout');
  expect(await HomePage.isLoginLinkVisible()).toBeTruthy();

  const response = await deleteUserViaApi(request, userData);
  const result = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(result.message).toBe(MESSAGES.ACCOUNT_DELETED);
});