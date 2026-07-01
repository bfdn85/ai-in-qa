# QA Prompt Templates for Claude

A collection of reusable prompts I use in my daily QA workflow. Copy, paste, and fill in the bracketed sections.

---

## 1. Generate Test Cases from Requirements

```
Here is a feature requirement:

[REQUIREMENTS]

Generate detailed test cases including:
- Happy path scenarios
- Negative scenarios
- Edge cases
- Security scenarios

Format as a table with columns: Test Case ID, Description, Steps, Expected Result.
```

---

## 2. Generate Playwright Test Script

```
I am using Playwright with JavaScript. 

Write a test for the following scenario:
[SCENARIO]

The app base URL is [YOUR URL].
The selectors to use are:
- Email field: [SELECTOR]
- Password field: [SELECTOR]
- Submit button: [SELECTOR]

Include proper assertions and use waitForLoadState where appropriate.
```

---

## 3. Debug a Failing Playwright Test

```
My Playwright test is failing with this error:

[eRROR MESSAGE]

Here is my test code:

[CODE]

What are the most likely causes and how do I fix each one?
```

---

## 4. Review and Improve Existing Test Code

```
Review this Playwright test and suggest improvements for:
- Reliability (flakiness reduction)
- Readability
- Better assertion coverage
- Maintainability

[CODE]
```

---

## 5. Write a SQL Validation Query

```
I need to validate data in a [PostgreSQL / SQL Server / MySQL] database.

Here is what I need to check:
[DESCRIBE WHAT YOU NEED TO VALIDATE]

The relevant tables are:
- [TABLE NAME]: [BRIEF DESCRIPTION OF COLUMNS]
- [TABLE NAME]: [BRIEF DESCRIPTION OF COLUMNS]

Write a query that surfaces any mismatches or data integrity issues.
```

---

## 6. Write a Defect Report

```
I found a bug. Here are the details:

What I was doing: [DESCRIBE ACTION]
What happened: [DESCRIBE ACTUAL RESULT]
What should have happened: [DESCRIBE EXPECTED RESULT]
Environment: [BROWSER, OS, ENV]

Write a clear, professional defect report with title, steps to reproduce, expected result, actual result, and severity.
```

---

## 7. Regression Impact Analysis

```
Here are the changes included in this sprint / release:

[PASTE CHANGELOG OR TICKET DESCRIPTIONS]

Based on these changes, what areas of the application should I prioritize for regression testing? 
List them in order of risk.
```

---

## 8. Exploratory Testing Ideas

```
I am about to explore the following feature:

[DESCRIBE THE FEATURE]

The application is a [TYPE OF APP, e.g. multi-tenant SaaS healthcare platform].

Give me a list of creative edge cases, negative scenarios, and security concerns 
I should investigate during exploratory testing.
```

---

## 9. Summarize and Categorize Defects for a Test Report

```
Here is a list of defects found during this testing cycle:

[DEFECT LIST]

Summarize them by:
- Severity breakdown (Critical / High / Medium / Low)
- Affected feature areas
- Any patterns or root cause themes you notice

Format suitable for a stakeholder report.
```
