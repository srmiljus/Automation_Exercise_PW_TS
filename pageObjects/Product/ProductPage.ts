import { BasePage } from '../Base/BasePage';
import { Page, Locator } from '@playwright/test';
import { ProductPageLocators } from './ProductPageLocators';

export class ProductPage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }

  private get searchInput(): Locator {
    return this.page.locator(ProductPageLocators.searchInput);
  }

  private get searchButton(): Locator {
    return this.page.locator(ProductPageLocators.searchButton);
  }

  private get cartModal(): Locator {
    return this.page.locator(ProductPageLocators.cartModal);
  }

  private get cartModalTitle(): Locator {
    return this.page.locator(ProductPageLocators.cartModalTitle);
  }

  private get viewCartLink(): Locator {
    return this.page.getByRole(ProductPageLocators.viewCartLink.role, {
      name: ProductPageLocators.viewCartLink.name,
    });
  }

  private get productNameElements(): Locator {
    return this.page.locator(ProductPageLocators.productName);
  }

  private findProductRowByName(productName: string): Locator {
    return this.productNameElements.filter({ hasText: productName }).first();
  }

  async enterSearchText(productName: string): Promise<void> {
    try {
      await this.waitUntilVisible(this.searchInput);
      await this.fillInput(this.searchInput, productName);
      await this.click(this.searchButton);
    } catch (error) {
      console.warn('Failed to perform search:', error);
    }
  }

  async productItemIsVisible(productName: string): Promise<boolean> {
    try {
      const productRow = this.findProductRowByName(productName);
      await this.waitUntilVisible(productRow);
      return productRow.isVisible();
    } catch (error) {
      console.warn('Product not visible:', error);
      return false;
    }
  }

  async clickOnAddToCartButton(productName: string): Promise<void> {
    try {
      const productRow = this.findProductRowByName(productName);
      await this.hover(productRow);

      const addToCartButton = productRow
        .locator('..')
        .locator(ProductPageLocators.addToCartButton);

      await this.waitUntilVisible(addToCartButton);
      await this.click(addToCartButton);
    } catch (error) {
      console.warn(`Failed to click 'Add to cart' for ${productName}:`, error);
    }
  }

  async isCartModalVisible(): Promise<boolean> {
    try {
      await this.waitUntilVisible(this.cartModal);
      return this.cartModal.isVisible();
    } catch (error) {
      console.warn('Cart modal not visible:', error);
      return false;
    }
  }

  async isCartTitleVisible(expectedTitle: string): Promise<boolean> {
    try {
      await this.waitUntilVisible(this.cartModalTitle);
      const actualTitle = await this.getText(this.cartModalTitle);
      return actualTitle?.trim() === expectedTitle;
    } catch (error) {
      console.warn('Cart title mismatch or not visible:', error);
      return false;
    }
  }

  async clickCartLinkButton(): Promise<void> {
    try {
      await this.waitUntilVisible(this.viewCartLink);
      await this.click(this.viewCartLink);
    } catch (error) {
      console.warn('Failed to click view cart link:', error);
    }
  }
}