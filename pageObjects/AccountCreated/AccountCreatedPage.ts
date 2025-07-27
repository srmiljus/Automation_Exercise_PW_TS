import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base/BasePage';

export class AccountCreatedPage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }

  private get message(): Locator {
    return this.page.getByTestId('account-created');
  }

  private get continueButton(): Locator {
    return this.page.getByTestId('continue-button');
  }

  async getAccountCreatedMessage(): Promise<string> {
    await this.waitUntilVisible(this.message);
    const text = await this.getText(this.message);
    return text?.trim() || '';
  }

  async clickContinue(): Promise<void> {
    await this.click(this.continueButton);
  }
}