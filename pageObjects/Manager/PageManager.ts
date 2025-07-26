import { Page } from '@playwright/test';
import { HomePage } from '../Home/HomePage';
import { LoginPage } from '../Login/LoginPage';
import { SignupPage } from '../Signup/SignupPage';
import { AccountCreatedPage } from '../AccountCreated/AccountCreatedPage';
import { ProductPage } from '../Product/ProductPage';
import { CartPage } from '../Cart/CartPage';

export class PageManager {
    constructor(private readonly page: Page) { }

    get HomePage(): HomePage {
        return new HomePage(this.page);
    }

    get LoginPage(): LoginPage {
        return new LoginPage(this.page);
    }

    get SignupPage(): SignupPage {
        return new SignupPage(this.page);
    }

    get AccountCreatedPage(): AccountCreatedPage {
        return new AccountCreatedPage(this.page);
    }

    get ProductPage(): ProductPage {
        return new ProductPage(this.page);
    }

    get CartPage(): CartPage {
        return new CartPage(this.page);
    }

}