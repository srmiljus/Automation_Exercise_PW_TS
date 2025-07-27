import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base/BasePage';

export class LoginPage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }

  private get signupName(): Locator {
    return this.page.getByTestId('signup-name');
  }

  private get signupEmail(): Locator {
    return this.page.getByTestId('signup-email');
  }

  private get signupButton(): Locator {
    return this.page.getByTestId('signup-button');
  }

  private get loginEmail(): Locator {
    return this.page.getByTestId('login-email');
  }

  private get loginPassword(): Locator {
    return this.page.getByTestId('login-password');
  }

  private get loginButton(): Locator {
    return this.page.getByTestId('login-button');
  }

  get loginError(): Locator {
    return this.page.getByText('Your email or password is incorrect!');
  }

  get signupError(): Locator {
    return this.page.getByText('Email Address already exist!');
  }

  async enterSignupName(name: string): Promise<void> {
    try {
      await this.fillInput(this.signupName, name);
    } catch (error) {
      console.warn('Failed to enter signup name:', error);
    }
  }

  async enterSignupEmail(email: string): Promise<void> {
    try {
      await this.fillInput(this.signupEmail, email);
    } catch (error) {
      console.warn('Failed to enter signup email:', error);
    }
  }

  async clickSignup(): Promise<void> {
    try {
      await this.click(this.signupButton);
    } catch (error) {
      console.warn('Failed to click signup button:', error);
    }
  }

  async enterLoginEmail(email: string): Promise<void> {
    try {
      await this.fillInput(this.loginEmail, email);
    } catch (error) {
      console.warn('Failed to enter login email:', error);
    }
  }

  async enterLoginPassword(password: string): Promise<void> {
    try {
      await this.fillInput(this.loginPassword, password);
    } catch (error) {
      console.warn('Failed to enter login password:', error);
    }
  }

  async clickLogin(): Promise<void> {
    try {
      await this.click(this.loginButton);
    } catch (error) {
      console.warn('Failed to click login button:', error);
    }
  }

  getLoginErrorLocator(): Locator {
    return this.loginError;
  }

  getSignupErrorLocator(): Locator {
    return this.signupError;
  }
}