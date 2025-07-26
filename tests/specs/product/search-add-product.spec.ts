import { test, expect } from '../../fixtures/base.fixture';
import testData from '../../../testData.json';
import { URLS } from '../../constants/urls';
import { MESSAGES } from '../../constants/messages';

test.describe('Search and Add Product', () => {
  test('Verify searching and adding certain product to the Cart @smoke @regression', async ({
    pageManager: { ProductPage, CartPage },
  }) => {
    await ProductPage.open(URLS.PRODUCT);
    await expect(ProductPage.getCurrentUrl()).resolves.toBe(URLS.PRODUCT);

    await ProductPage.enterSearchText('T-Shirt');

    const productVisible = await ProductPage.productItemIsVisible(testData.product.name);
    expect(productVisible).toBeTruthy();

    await ProductPage.clickOnAddToCartButton(testData.product.name);

    expect(await ProductPage.isCartModalVisible()).toBeTruthy();
    expect(await ProductPage.isCartTitleVisible(MESSAGES.ADDED_TO_CART)).toBeTruthy();

    await ProductPage.clickCartLinkButton();
    await CartPage.assertProductDetailsMatch(testData.product);
  });
});