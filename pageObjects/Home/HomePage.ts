import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '../Base/BasePage';
import { URLS } from '../../tests/constants/urls';
import { HomePageLocators } from './HomePageLocators';

export class HomePage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }

  private getLoginLink(linkText: string): Locator {
    return this.page.getByRole('link', { name: linkText });
  }

  private getLoggedInText(userName: string): Locator {
    const fullText = `${HomePageLocators.loggedInTextPrefix}${userName}`;
    return this.page.getByText(fullText);
  }

  async clickNavigationLink(linkText: string): Promise<void> {
    const link = this.getLoginLink(linkText);
    await this.waitUntilVisible(link);
    await this.click(link);
  }

  async isUserLoggedIn(userName: string): Promise<boolean> {
    try {
      const loggedInText = this.getLoggedInText(userName);
      await this.waitUntilVisible(loggedInText);
      return await loggedInText.isVisible();
    } catch (error) {
      console.warn(`User not logged in (${userName}):`, error);
      return false;
    }
  }

  async isLoginLinkVisible(): Promise<boolean> {
    try {
      const loginLink = this.getLoginLink(HomePageLocators.loginLinkName);
      await this.waitUntilVisible(loginLink);
      return await loginLink.isVisible();
    } catch (error) {
      console.warn('Login link not visible:', error);
      return false;
    }
  }

  async goToLoginSignup(): Promise<void> {
    await this.open('/');
    await expect(this.getCurrentUrl()).resolves.toBe(URLS.HOME);
    await this.clickNavigationLink(HomePageLocators.loginLinkName);
  }
}