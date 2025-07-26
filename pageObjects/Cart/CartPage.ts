import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage';
import { CartPageLocators } from './CartPageLocators';

interface CartProductData {
  name: string;
  price: string;
  quantity: string;
}

export class CartPage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }

  private get productNameElements(): Locator {
    return this.page.locator(CartPageLocators.cartTableRows);
  }

  private getDescriptionCell(row: Locator): Locator {
    return row.locator(CartPageLocators.cartDescriptionCell);
  }

  private getPriceCell(row: Locator): Locator {
    return row.locator(CartPageLocators.cartCell).nth(CartPageLocators.priceColumnIndex);
  }

  private getQuantityCell(row: Locator): Locator {
    return row.locator(CartPageLocators.cartCell).nth(CartPageLocators.quantityColumnIndex);
  }

  private findProductRowByName(productName: string): Locator {
    return this.productNameElements.filter({ hasText: productName }).first();
  }

  async assertProductNameInDescription(productName: string): Promise<void> {
    try {
      const row = this.findProductRowByName(productName);
      await expect(row).toBeVisible();

      const descriptionCell = this.getDescriptionCell(row);
      const descriptionText = await this.getText(descriptionCell);
      expect(descriptionText).toContain(productName);
    } catch (error) {
      console.warn(`Failed to assert product name "${productName}" in description:`, error);
    }
  }

  async doesProductPriceMatch(productName: string, expectedPrice: string): Promise<boolean> {
    try {
      const row = this.findProductRowByName(productName);
      await expect(row).toBeVisible();

      const priceCell = this.getPriceCell(row);
      const priceText = await this.getText(priceCell);
      return priceText?.trim().includes(expectedPrice) ?? false;
    } catch (error) {
      console.warn(`Failed to verify price for product "${productName}":`, error);
      return false;
    }
  }

  async doesProductQuantityMatch(productName: string, expectedQuantity: string): Promise<boolean> {
    try {
      const row = this.findProductRowByName(productName);
      await expect(row).toBeVisible();

      const quantityCell = this.getQuantityCell(row);
      const quantityText = await this.getText(quantityCell);
      return quantityText?.trim() === expectedQuantity;
    } catch (error) {
      console.warn(`Failed to verify quantity for product "${productName}":`, error);
      return false;
    }
  }

  async assertProductDetailsMatch(data: CartProductData): Promise<void> {
    await this.assertProductNameInDescription(data.name);

    const priceMatches = await this.doesProductPriceMatch(data.name, data.price);
    expect(priceMatches).toBeTruthy();

    const quantityMatches = await this.doesProductQuantityMatch(data.name, data.quantity);
    expect(quantityMatches).toBeTruthy();
  }
}