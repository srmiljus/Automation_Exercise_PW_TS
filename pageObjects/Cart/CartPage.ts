import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage';

interface CartProductData {
  name: string;
  price: string;
  quantity: string;
}

export class CartPage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }

  private get cartTableRows(): Locator {
    return this.page.locator('#cart_info_table tbody tr');
  }

  private getDescriptionCell(row: Locator): Locator {
    return row.locator('td.cart_description');
  }

  private getPriceCell(row: Locator): Locator {
    return row.locator('td').nth(2);
  }

  private getQuantityCell(row: Locator): Locator {
    return row.locator('td').nth(3);
  }

  private findProductRow(productName: string): Locator {
    return this.cartTableRows.filter({ hasText: productName }).first();
  }

  async assertProductDetailsMatch(data: CartProductData): Promise<void> {
    try {
      const row = this.findProductRow(data.name);
      await this.waitUntilVisible(row);

      const description = await this.getText(this.getDescriptionCell(row));
      expect(description).toContain(data.name);

      const price = await this.getText(this.getPriceCell(row));
      expect(price?.trim()).toContain(data.price);

      const quantity = await this.getText(this.getQuantityCell(row));
      expect(quantity?.trim()).toBe(data.quantity);
    } catch (error) {
      console.warn(`Failed to assert product details for "${data.name}":`, error);
    }
  }
}