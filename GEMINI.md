<!-- vibe-rules Integration -->

# Development Mandates

## Test-Driven Development (TDD)
- **Mandatory Workflow:** Always implement features and bug fixes using TDD.
- **Red-Green-Refactor:**
  1.  **Test First:** Create a failing test case that defines the expected behavior BEFORE writing any implementation code.
  2.  **Pass:** Write the minimal implementation required to make the test pass.
  3.  **Validate:** Ensure all tests (new and existing) pass.
  4.  **Refactor:** Clean up the code while maintaining passing tests.

## Feature Implementation Workflow
- **Step 1: Discussion:** Before any implementation, we must discuss the feature's scope, requirements, and technical approach.
- **Step 2: Documentation:** Once the discussion is finalized, append the feature details (description, requirements, and implementation plan) to `FEATURES.md`.
- **Step 3: Confirmation:** Explicitly ask for my confirmation to begin the implementation. DO NOT start coding until I have given the green light.

## Technical Stack
- **Application Framework:** Electrobun (NOT Electron)
- **Runtime & Package Manager:** Bun
- **Core Libraries:**
  - **Routing:** TanStack Router
  - **Data Fetching:** TanStack Query
  - **Tables:** TanStack Table
  - **Forms:** TanStack Form
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS

---
