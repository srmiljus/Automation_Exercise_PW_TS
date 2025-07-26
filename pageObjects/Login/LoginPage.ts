import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base/BasePage';
import { LoginPageLocators } from './LoginPageLocators';

export class LoginPage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }

  private get signupNameInput(): Locator {
    return this.page.getByTestId(LoginPageLocators.signupNameInput);
  }

  private get signupEmailInput(): Locator {
    return this.page.getByTestId(LoginPageLocators.signupEmailInput);
  }

  private get signupButton(): Locator {
    return this.page.getByTestId(LoginPageLocators.signupButton);
  }

  private get loginEmailInput(): Locator {
    return this.page.getByTestId(LoginPageLocators.loginEmailInput);
  }

  private get loginPasswordInput(): Locator {
    return this.page.getByTestId(LoginPageLocators.loginPasswordInput);
  }

  private get loginButton(): Locator {
    return this.page.getByTestId(LoginPageLocators.loginButton);
  }

  get loginErrorLocator(): Locator {
    return this.page.getByText(LoginPageLocators.loginErrorText);
  }

  get signupErrorLocator(): Locator {
    return this.page.getByText(LoginPageLocators.signupErrorText);
  }

  async enterSignupName(name: string): Promise<void> {
    try {
      await this.fillInput(this.signupNameInput, name);
    } catch (error) {
      console.warn('Failed to enter signup name:', error);
    }
  }

  async enterSignupEmail(email: string): Promise<void> {
    try {
      await this.fillInput(this.signupEmailInput, email);
    } catch (error) {
      console.warn('Failed to enter signup email:', error);
    }
  }

  async clickSignupButton(): Promise<void> {
    try {
      await this.click(this.signupButton);
    } catch (error) {
      console.warn('Failed to click signup button:', error);
    }
  }

  async enterLoginEmail(email: string): Promise<void> {
    try {
      await this.fillInput(this.loginEmailInput, email);
    } catch (error) {
      console.warn('Failed to enter login email:', error);
    }
  }

  async enterLoginPassword(password: string): Promise<void> {
    try {
      await this.fillInput(this.loginPasswordInput, password);
    } catch (error) {
      console.warn('Failed to enter login password:', error);
    }
  }

  async clickLoginButton(): Promise<void> {
    try {
      await this.click(this.loginButton);
    } catch (error) {
      console.warn('Failed to click login button:', error);
    }
  }
}