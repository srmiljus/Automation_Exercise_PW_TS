import { Page, Locator, selectors } from '@playwright/test';

export abstract class BasePage {
    constructor(protected readonly page: Page) {
        selectors.setTestIdAttribute('data-qa');
    }

    async open(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async fillInput(locator: Locator, text: string): Promise<void> {
        await locator.fill(text);
    }

    async getText(locator: Locator): Promise<string | null> {
        return locator.textContent();
    }

    async waitUntilVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
    }

    async hover(locator: Locator): Promise<void> {
        await locator.hover();
    }
}