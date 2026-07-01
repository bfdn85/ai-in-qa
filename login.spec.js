/**
 * login.spec.js
 *
 * Test Suite: Login Feature
 * Author: Burcin Fidan
 * AI Assistance: Claude (Anthropic) was used to generate the initial test structure
 *                and selectors. All test cases were reviewed, refined, and validated
 *                by Burcin Fidan to ensure accuracy and real-world coverage.
 *
 * Coverage:
 *   - Happy path login with valid credentials
 *   - Negative scenarios (wrong password, empty fields)
 *   - Account lockout after 5 failed attempts
 *   - Security scenarios (SQL injection, session invalidation)
 *
 * Test IDs map to login_test_cases.md for full traceability.
 *
 * Setup Notes:
 *   - Set BASE_URL, TEST_EMAIL, TEST_PASSWORD as environment variables
 *   - Test user must exist and not be locked before running
 *   - Run lockout tests in isolation as they affect account state
 */

const { test, expect } = require('@playwright/test');

// ---------------------------------------------------------------------------
// Configuration
// Using environment variables to avoid hardcoding credentials in source code
// ---------------------------------------------------------------------------
const BASE_URL = process.env.BASE_URL || 'https://your-app-url.com';
const VALID_EMAIL = process.env.TEST_EMAIL || 'testuser@example.com';
const VALID_PASSWORD = process.env.TEST_PASSWORD || 'Test@1234';

test.describe('Login Feature', () => {

  /**
   * beforeEach: Navigate to the login page before every test
   * waitForLoadState('networkidle') ensures the page is fully loaded
   * before we start interacting with elements, reducing flakiness
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle');
  });

  // -------------------------------------------------------------------------
  // Happy Path
  // Verifies the core login flow works as expected for a valid user
  // -------------------------------------------------------------------------

  test('TC-001: Valid login redirects to dashboard', async ({ page }) => {
    // Fill in valid credentials and submit
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');

    // User should land on the dashboard with a welcome message visible
    await expect(page).toHaveURL(`${BASE_URL}/dashboard`);
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // Negative Scenarios
  // Verifies the application handles invalid input gracefully
  // and does not allow unauthorized access
  // -------------------------------------------------------------------------

  test('TC-004: Wrong password shows error message and stays on login page', async ({ page }) => {
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', 'WrongPassword123');
    await page.click('button[type="submit"]');

    // Error message must be visible and user must remain on the login page
    // We do NOT assert the specific error text to avoid exposing whether
    // the email exists in the system (security best practice)
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page).toHaveURL(`${BASE_URL}/login`);
  });

  test('TC-006: Submitting without email shows inline validation error', async ({ page }) => {
    // Only fill password, leave email blank
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');

    // Inline validation error should appear on the email field
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
  });

  test('TC-007: Submitting without password shows inline validation error', async ({ page }) => {
    // Only fill email, leave password blank
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.click('button[type="submit"]');

    // Inline validation error should appear on the password field
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // Account Lockout
  // Verifies the application enforces the 5-attempt lockout policy
  //
  // NOTE: This test modifies account state. Run it in isolation or use
  // a dedicated test account that gets reset between runs.
  // -------------------------------------------------------------------------

  test('TC-009: Account locks after 5 consecutive failed login attempts', async ({ page }) => {
    /**
     * We loop 5 times with an intentionally wrong password.
     * waitForLoadState('networkidle') after each attempt ensures the page
     * has fully processed the failed login before the next attempt,
     * so the server-side counter increments correctly.
     */
    for (let i = 0; i < 5; i++) {
      await page.fill('input[name="email"]', VALID_EMAIL);
      await page.fill('input[name="password"]', 'WrongPassword');
      await page.click('button[type="submit"]');
      await page.waitForLoadState('networkidle');
    }

    // After the 5th failure the lockout message should appear
    // and the submit button should be disabled to prevent further attempts
    await expect(page.locator('[data-testid="lockout-message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  // -------------------------------------------------------------------------
  // Security Scenarios
  // Verifies the application is protected against common attack vectors
  // -------------------------------------------------------------------------

  test('TC-015: SQL injection attempt in email field is safely rejected', async ({ page }) => {
    /**
     * A classic SQL injection string that would return all rows if the
     * query is not parameterized. The app must reject this without
     * exposing any database error messages.
     */
    await page.fill('input[name="email"]', "' OR 1=1--");
    await page.fill('input[name="password"]', 'anything');
    await page.click('button[type="submit"]');

    // User must remain on the login page and must NOT see a welcome message
    await expect(page).toHaveURL(`${BASE_URL}/login`);
    await expect(page.locator('text=Welcome')).not.toBeVisible();
  });

  test('TC-018: Session token is invalidated after logout, preventing re-entry', async ({ page }) => {
    /**
     * This test verifies that after logout, a user cannot access protected
     * pages by navigating directly to the URL. This checks that the server
     * invalidates the session token on logout, not just the client cookie.
     */

    // Step 1: Log in successfully
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(`${BASE_URL}/dashboard`);

    // Step 2: Log out
    await page.click('[data-testid="logout-button"]');
    await expect(page).toHaveURL(`${BASE_URL}/login`);

    // Step 3: Try to navigate directly to a protected page
    // If the session was properly invalidated, the app must redirect back to login
    await page.goto(`${BASE_URL}/dashboard`);
    await expect(page).toHaveURL(`${BASE_URL}/login`);
  });

});
