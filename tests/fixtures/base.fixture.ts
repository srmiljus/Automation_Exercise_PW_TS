import { test as baseTest, expect } from '@playwright/test';
import { PageManager } from '../../pageObjects/Manager/PageManager';
import type { UserData } from '../types/user.types';
import { deleteUserViaApi } from '../../utils/userApiHelper';
import { MESSAGES } from '../constants/messages';
import { generateFullUser } from '../../utils/generateFullUser';

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
    const user = generateFullUser();
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