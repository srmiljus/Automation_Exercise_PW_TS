import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base/BasePage';

export class ProductPage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }

  private get searchInput(): Locator {
    return this.page.locator('#search_product');
  }

  private get searchButton(): Locator {
    return this.page.locator('#submit_search');
  }

  private get cartModal(): Locator {
    return this.page.locator('#cartModal');
  }

  private get cartModalTitle(): Locator {
    return this.page.locator('.modal-title');
  }

  private get viewCartLink(): Locator {
    return this.page.getByRole('link', { name: 'View Cart' });
  }

  private get productNameElements(): Locator {
    return this.page.locator('.productinfo p');
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
      console.warn('Failed to perform product search:', error);
    }
  }

  async productItemIsVisible(productName: string): Promise<boolean> {
    try {
      const productRow = this.findProductRowByName(productName);
      await this.waitUntilVisible(productRow);
      return await productRow.isVisible();
    } catch (error) {
      console.warn(`Product "${productName}" not visible:`, error);
      return false;
    }
  }

  async clickOnAddToCartButton(productName: string): Promise<void> {
    try {
      const productRow = this.findProductRowByName(productName);
      await this.hover(productRow);

      const addToCartButton = productRow.locator('..').locator('a:has-text("Add to cart")');
      await this.waitUntilVisible(addToCartButton);
      await this.click(addToCartButton);
    } catch (error) {
      console.warn(`Failed to click 'Add to cart' for "${productName}":`, error);
    }
  }

  async isCartModalVisible(): Promise<boolean> {
    try {
      await this.waitUntilVisible(this.cartModal);
      return await this.cartModal.isVisible();
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
      console.warn('Cart modal title mismatch or not visible:', error);
      return false;
    }
  }

  async clickCartLinkButton(): Promise<void> {
    try {
      await this.waitUntilVisible(this.viewCartLink);
      await this.click(this.viewCartLink);
    } catch (error) {
      console.warn('Failed to click View Cart link:', error);
    }
  }
}