# AI-in-QA


# AI-Augmented Testing

## About This Repository

This repository demonstrates how I integrate AI into my QA workflow to improve speed, coverage, and quality. It includes working Playwright scripts, AI-generated test cases, SQL validation queries, reusable prompt templates, and defect report examples, all reviewed and validated by me.

## About Me

I am Burcin Fidan, a Senior QA Engineer with 8 years of experience testing complex SaaS platforms. I have worked across the full testing spectrum including manual testing, exploratory testing, SQL-based data validation, and automation. I am self-taught in Playwright and have contributed to automation efforts across multiple teams.

What sets my approach apart is that I think like a user first. Having been an end user myself, I understand how product quality impacts real people and that perspective drives the thoroughness and depth of my testing.

This repository showcases how I use AI not to replace QA judgment, but to amplify it.

## Table of Contents

- [About This Repository](#about-this-repository)
- [Test Cases](ai-in-qa/login_test_cases.md)
- [Playwright Scripts](login.spec.js)
- [SQL Queries](data_validation.sql)
- [Prompt Templates](prompt_examples.md)
- [How I Use AI in My Workflow](#how-i-use-ai-in-my-workflow)
- [How to Run the Playwright Scripts](#how-to-run-the-playwright-scripts)
- [Tools Used](#tools-used)

## How I Use AI in My Workflow

I use Claude as a thinking partner throughout the testing process. Here is how it fits into my daily work:

**Test Case Generation** — I paste feature requirements into Claude and ask for comprehensive test cases including edge cases and security scenarios. Coverage is broader because AI does not get tunnel vision the way humans can after reading the same requirement multiple times.

**Playwright Automation** — I describe the scenario I want to test and Claude generates the initial script. I then review every line, adjust selectors to match the real UI, add meaningful comments, and validate the test actually catches real bugs. AI writes the boilerplate. I apply the QA judgment.

**SQL Data Validation** — I describe the integrity check I need and Claude writes the query. I review it, run it, and investigate anything it surfaces. This is especially powerful for multi-tenant SaaS platforms where data isolation bugs can be critical.

**Defect Reports** — I describe what I found and Claude structures it into a clear, professional defect report with steps to reproduce, expected vs actual, and severity assessment.

**Regression Scoping** — I paste release notes or sprint changes and ask Claude which areas carry the most risk. It gives me a prioritized list I use to plan my regression pass intelligently rather than running everything.

## How to Run the Playwright Scripts


## Tools Used

| Tool | Purpose |
|------|---------|
| [Claude by Anthropic](https://claude.ai) | Primary AI assistant for test generation, automation, debugging, and documentation |
| Playwright | UI test automation |
| Postman | API testing and validation |
| SQL Server / PostgreSQL | Backend data validation |
| Jira / QASE | Test management and defect tracking |

## My Approach to QA

I focus on risk-based testing, clear communication, and ensuring the user experience is reliable and intuitive. I believe quality is a shared responsibility and works best when QA collaborates closely with product and engineering teams. AI is one more tool that helps me do that better.

---

*All examples in this repository are created for demonstration purposes only. See also my [QA Portfolio](https://github.com/bfdn85/QA-Portfolio) repository for test planning, risk analysis, test strategy, and defect documentation examples.*
