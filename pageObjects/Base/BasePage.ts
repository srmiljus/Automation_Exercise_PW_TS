import { Page, Locator, selectors, expect } from '@playwright/test';

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

    async waitUntilHidden(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'hidden' });
    }

    async hover(locator: Locator): Promise<void> {
        await locator.hover();
    }

    async assertVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async assertHidden(locator: Locator): Promise<void> {
        await expect(locator).toBeHidden();
    }

    async assertHasText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toHaveText(expectedText);
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
}