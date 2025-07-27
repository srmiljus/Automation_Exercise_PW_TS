import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base/BasePage';

export interface UserRegistrationData {
    title: string;
    password: string;
    birthday: string;
    birthmonth: string;
    birthyear: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    mobileNumber: string;
}

export class SignupPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
    }

    private getInput(testId: string): Locator {
        return this.page.getByTestId(testId);
    }

    private getDropdown(testId: string): Locator {
        return this.page.getByTestId(testId);
    }

    private getTitleRadioButton(title: string): Locator {
        return this.page.getByRole('radio', { name: title });
    }

    async selectTitle(title: string): Promise<void> {
        try {
            await this.click(this.getTitleRadioButton(title));
        } catch (error) {
            console.warn(`Failed to select title '${title}':`, error);
        }
    }

    async enterPassword(password: string): Promise<void> {
        try {
            await this.fillInput(this.getInput('password'), password);
        } catch (error) {
            console.warn('Failed to enter password:', error);
        }
    }

    async selectBirthday(day: string, month: string, year: string): Promise<void> {
        try {
            await this.getDropdown('days').selectOption({ label: day });
            await this.getDropdown('months').selectOption({ label: month });
            await this.getDropdown('years').selectOption({ label: year });
        } catch (error) {
            console.warn('Failed to select birthday:', error);
        }
    }

    async enterFirstName(firstName: string): Promise<void> {
        try {
            await this.fillInput(this.getInput('first_name'), firstName);
        } catch (error) {
            console.warn('Failed to enter first name:', error);
        }
    }

    async enterLastName(lastName: string): Promise<void> {
        try {
            await this.fillInput(this.getInput('last_name'), lastName);
        } catch (error) {
            console.warn('Failed to enter last name:', error);
        }
    }

    async enterCompany(company: string): Promise<void> {
        try {
            await this.fillInput(this.getInput('company'), company);
        } catch (error) {
            console.warn('Failed to enter company:', error);
        }
    }

    async enterAddress(address: string): Promise<void> {
        try {
            await this.fillInput(this.getInput('address'), address);
        } catch (error) {
            console.warn('Failed to enter address:', error);
        }
    }

    async enterCity(city: string): Promise<void> {
        try {
            await this.fillInput(this.getInput('city'), city);
        } catch (error) {
            console.warn('Failed to enter city:', error);
        }
    }

    async enterState(state: string): Promise<void> {
        try {
            await this.fillInput(this.getInput('state'), state);
        } catch (error) {
            console.warn('Failed to enter state:', error);
        }
    }

    async enterZipcode(zipcode: string): Promise<void> {
        try {
            await this.fillInput(this.getInput('zipcode'), zipcode);
        } catch (error) {
            console.warn('Failed to enter zipcode:', error);
        }
    }

    async selectCountry(country: string): Promise<void> {
        try {
            await this.getDropdown('country').selectOption({ label: country });
        } catch (error) {
            console.warn('Failed to select country:', error);
        }
    }

    async enterMobileNumber(number: string): Promise<void> {
        try {
            await this.fillInput(this.getInput('mobile_number'), number);
        } catch (error) {
            console.warn('Failed to enter mobile number:', error);
        }
    }

    async clickCreateAccountButton(): Promise<void> {
        try {
            await this.click(this.getInput('create-account'));
        } catch (error) {
            console.warn('Failed to click Create Account button:', error);
        }
    }

    async fillRegistrationForm(user: UserRegistrationData): Promise<void> {
        try {
            await this.selectTitle(user.title);
            await this.enterPassword(user.password);
            await this.selectBirthday(user.birthday, user.birthmonth, user.birthyear);
            await this.enterFirstName(user.firstName);
            await this.enterLastName(user.lastName);
            await this.enterCompany(user.company);
            await this.enterAddress(user.address);
            await this.enterCity(user.city);
            await this.enterState(user.state);
            await this.enterZipcode(user.zipcode);
            await this.selectCountry(user.country);
            await this.enterMobileNumber(user.mobileNumber);
            await this.clickCreateAccountButton();
        } catch (error) {
            console.warn('Failed to fill registration form:', error);
        }
    }
}