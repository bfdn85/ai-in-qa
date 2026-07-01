# AI-Generated Test Cases: Login Feature

## How This Was Created

I provided Claude with the login feature requirements below and asked it to generate comprehensive test cases including happy path, negative scenarios, edge cases, and security scenarios.

---

## Feature Requirements

- Users can log in with email and password
- After 5 failed attempts the account locks for 30 minutes
- Password reset link expires after 1 hour
- Users can log in via SSO (Google)

---

## Test Cases

### Happy Path

| ID | Test Case | Steps | Expected Result |
|----|-----------|-------|-----------------|
| TC-001 | Valid login with email and password | 1. Navigate to /login 2. Enter valid email 3. Enter valid password 4. Click Login | User redirected to /dashboard, welcome message visible |
| TC-002 | Valid SSO login via Google | 1. Click "Sign in with Google" 2. Complete Google auth flow | User redirected to /dashboard |
| TC-003 | Successful login after previous lockout expires | 1. Wait 30 min after lockout 2. Enter valid credentials | User logs in successfully |

### Negative Scenarios

| ID | Test Case | Steps | Expected Result |
|----|-----------|-------|-----------------|
| TC-004 | Wrong password | Enter valid email, wrong password, click Login | Error message shown, attempt counter increments |
| TC-005 | Non-existent email | Enter email not in system, any password | Generic error shown (not revealing if email exists) |
| TC-006 | Empty email field | Leave email blank, enter password, click Login | Inline validation error on email field |
| TC-007 | Empty password field | Enter email, leave password blank, click Login | Inline validation error on password field |
| TC-008 | Both fields empty | Click Login with no input | Validation errors on both fields |

### Account Lockout

| ID | Test Case | Steps | Expected Result |
|----|-----------|-------|-----------------|
| TC-009 | Account locks after 5 failed attempts | Fail login 5 times with wrong password | Account locked message shown, no further attempts allowed |
| TC-010 | Login blocked during lockout window | Attempt login during 30 min lockout | Access denied, time remaining shown |
| TC-011 | Counter resets after successful login | Fail 3 times, then log in successfully | Attempt counter resets to 0 |

### Password Reset

| ID | Test Case | Steps | Expected Result |
|----|-----------|-------|-----------------|
| TC-012 | Valid password reset within 1 hour | Request reset, click link within 1 hour | User can set new password |
| TC-013 | Expired reset link | Click reset link after 1 hour | Link expired message shown, option to request new link |
| TC-014 | Reset link used twice | Use reset link, then try to use it again | Second use rejected, link is single-use |

### Security

| ID | Test Case | Steps | Expected Result |
|----|-----------|-------|-----------------|
| TC-015 | SQL injection in email field | Enter `' OR 1=1--` in email field | Login rejected, no DB error exposed |
| TC-016 | XSS in password field | Enter `<script>alert(1)</script>` in password | Input sanitized, no script executed |
| TC-017 | Brute force via API | Send 100 rapid POST requests to /api/login | Rate limiting kicks in, requests throttled |
| TC-018 | Session token after logout | Log out, attempt to reuse old session token | Token invalidated, user redirected to login |
