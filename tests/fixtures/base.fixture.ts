import { test as baseTest, expect } from '@playwright/test';
import { PageManager } from '../../pageObjects/Manager/PageManager';
import testData from '../../testData.json';
import type { UserData } from '../types/user.types';
import { deleteUserViaApi } from '../../utils/userApiHelper';
import { MESSAGES } from '../constants/messages';

type MyFixtures = {
  pageManager: PageManager;
  userData: UserData;
};

export const test = baseTest.extend<MyFixtures>({
  pageManager: async ({ page }, use) => {
    const manager = new PageManager(page);
    await use(manager);
  },

  userData: async ({ request }, use, testInfo) => {
    const timestamp = Date.now();
    const user = {
      name: testData.user.name,
      email: `${testData.user.email}_${timestamp}@test.com`
    };

    await use(user);

    if (
      testInfo.title.includes('User Registration') ||
      testInfo.title.includes('Login Logout')
    ) {
      const response = await deleteUserViaApi(request, user);
      const result = await response.json();

      expect(response.ok()).toBeTruthy();
      expect(result.message).toBe(MESSAGES.ACCOUNT_DELETED);
    }
  }
});

export { expect };