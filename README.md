🎭 Playwright Automation Test Suite

This repository contains end-to-end automated tests written in Playwright with TypeScript.

The suite validates core user-facing functionality of the Automation Exercise website, including:
	•	User registration and login
	•	Negative validation messages (e.g., wrong credentials, duplicate email)
	•	Adding products to the cart
	•	Cart detail verification (name, price, quantity)
	•	Modal visibility and link navigation
	•	Tag-based test grouping: @regression, @negative, @smoke

Target website: https://automationexercise.com

The project follows a clean Page Object Model (POM) structure with reusable methods, custom locators, and fixtures using base.fixture.ts.

---

## Deliverables

* A complete Playwright test automation framework
* Page Object Model (POM) structure with reusable methods and locators
* Tag-based test grouping for flexible test execution
* GitHub Actions CI integration
* HTML test report generated after each run

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/srmiljus/Automation_Exercise_PW_TS.git
cd Automation_Exercise_PW_TS
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Install Playwright browsers

```bash
npx playwright install --with-deps
```

---

## Test Execution Instructions

### Run all tests

```bash
npx playwright test
```

### Run tests by tag

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @negative
```

### Show HTML report locally

```bash
npx playwright show-report
```

---

## Approach Explanation

* Uses a clean Page Object Model (POM) structure
* Uses fixtures to inject Page Object classes
* Allure reporter for rich test results
* Tags used to organize tests: `@smoke`, `@regression`, `@negative`
* API validations included for signup and cleanup
* Verifies expected error messages and URL transitions
* Supports both functional and UI-level validation

---

## Assumptions & Limitations

* Tests are executed on Chromium, Firefox and Webkit in CI
* Mobile/responsive testing is not included
* Allure reports are uploaded as CI artifacts, not viewable via GitHub Pages
* API stubbing is not used; tests rely on real responses

---

## CI/CD Integration

GitHub Actions workflow:

* Runs on every push or PR to `main` or `master`
* Supports manual triggering with tag selection dropdown (`@smoke`, `@regression`, `@negative`, `all`)
* Generates and uploads Allure and HTML reports as artifacts

Workflow file: `.github/workflows/playwright.yml`

---

## Test Report

Test results are stored as artifacts in GitHub Actions:

* **Allure Report**: Generated via Allure CLI and stored in `allure-report/`
* **Playwright HTML Report**: Stored in `reports/`

To view reports locally:

```bash
npx playwright show-report
```

To view Allure report locally:

```bash
npx allure serve allure-results
```

---

## Tech Stack

* [Playwright](https://playwright.dev/) - v1.52+
* TypeScript - v5.8+
* Node.js - v20+
* GitHub Actions - CI/CD integration
* HTML Reporting - Playwright HTML & Allure

---

## Folder Structure

```
Automation_Exercise_PW_TS/
│
├── .github/workflows/        # GitHub Actions workflow config
├── allure-report/            # Allure HTML report output
├── allure-results/           # Allure raw results
├── node_modules/
├── pageObjects/              # Page Object classes & locators
├── reports/                  # Playwright HTML report output
├── test-results/             # Playwright test outputs
├── tests/
│   ├── constants/            # Test constants (URLs, messages, etc.)
│   ├── fixtures/             # Custom base.fixture.ts
│   ├── specs/                # Grouped specs (login, signup, product)
│   ├── testData/             # Example users and test input data
│   ├── types/                # Shared TS types
│   └── utils/                # Custom helpers (e.g., API helpers)
├── playwright.config.ts      # Playwright configuration
├── testData.json             # Sample input data (external JSON)
└── tsconfig.json             # TypeScript configuration
```

---
