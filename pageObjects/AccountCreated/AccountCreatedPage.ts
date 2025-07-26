import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base/BasePage';
import { AccountCreatedPageLocators } from './AccountCreatedPageLocators';

export class AccountCreatedPage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }

  private get accountCreatedMessage(): Locator {
    return this.page.getByTestId(AccountCreatedPageLocators.accountCreatedMessage);
  }

  private get continueButton(): Locator {
    return this.page.getByTestId(AccountCreatedPageLocators.continueButton);
  }

  async getAccountCreatedMessage(): Promise<string | null> {
    try {
      await this.waitUntilVisible(this.accountCreatedMessage);
      return await this.getText(this.accountCreatedMessage);
    } catch (error) {
      console.warn('Failed to get account created message:', error);
      return null;
    }
  }

  async clickContinue(): Promise<void> {
    try {
      await this.click(this.continueButton);
    } catch (error) {
      console.warn('Failed to click Continue button on AccountCreatedPage:', error);
    }
  }
}