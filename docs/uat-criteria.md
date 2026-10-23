# User Acceptance Test Criteria

**Project:** Student Task Manager
**Document version:** 1.0
**Last updated:** 11 July 2026
**Related documents:** [Project Plan](./project-plan.md) · [Software Requirements Specification](./srs.md)

---

## 1. Purpose

This document defines the User Acceptance Test (UAT) criteria for the Fander Task Manager. UAT criteria establish the conditions under which the client formally accepts the delivered system as fit for purpose.

These criteria are written from the perspective of the end user — a Fander University student — rather than the developer. They describe observable outcomes, not implementation details.

## 2. Scope

UAT covers the delivered web application in its production (cloud-deployed) environment. It does not cover:

- Unit or integration testing (developer-owned, documented separately)
- Load or stress testing beyond the stated performance criterion
- Browser support outside the agreed target set

## 3. Method

Each criterion is expressed in **Given / When / Then** form and evaluated as a binary pass or fail. There are no partial passes.

- **Given** — the precondition or system state
- **When** — the action performed by the user
- **Then** — the observable, verifiable outcome

Tests are executed against the deployed application, not a local development build.

## 4. Traceability

| UAT Group | Requirement Area | Assessment Task |
|---|---|---|
| UAT-01, UAT-02, UAT-07 | Authentication & account management | B1, B3 |
| UAT-03, UAT-04 | Core task management | B1, B3 |
| UAT-05, UAT-06 | Reflection & history | B1, B3 |
| UAT-08.1, UAT-08.2 | Non-functional — usability & performance | B2, B4 |
| UAT-08.3, UAT-08.4 | Non-functional — security | B5 (Security Measures) |
| UAT-08.5 | Non-functional — availability | B5 (Monitoring) |

---

## 5. Acceptance Criteria

### UAT-01 — Account Registration

| ID | Criterion | Acceptance Condition |
|---|---|---|
| UAT-01.1 | New student can register | **Given** a valid email, name and password, **when** the student submits the registration form, **then** the account is created and the student is redirected to the login screen. |
| UAT-01.2 | Duplicate email rejected | **Given** an email address already present in the `users` table, **when** registration is attempted, **then** an inline error is displayed and no account is created. |
| UAT-01.3 | Weak password rejected | **Given** a password that does not meet the minimum policy, **when** registration is attempted, **then** a validation message is displayed and submission is blocked. |
| UAT-01.4 | Credentials stored securely | **Given** a successful registration, **when** the `users` table is inspected, **then** the password column contains a hash, not plaintext. |

### UAT-02 — Authentication

| ID | Criterion | Acceptance Condition |
|---|---|---|
| UAT-02.1 | Valid login succeeds | **Given** correct credentials, **when** the student logs in, **then** the dashboard loads containing only that student's tasks. |
| UAT-02.2 | Invalid login rejected | **Given** incorrect credentials, **when** login is attempted, **then** a generic error is displayed that does not disclose whether the email or the password was incorrect. |
| UAT-02.3 | Unauthenticated access blocked | **Given** no active session, **when** a protected route is requested directly, **then** the student is redirected to the login screen. |
| UAT-02.4 | Logout terminates session | **Given** an authenticated session, **when** the student logs out, **then** the session is invalidated and browser back-navigation does not restore the dashboard. |

### UAT-03 — Task Creation and Editing

| ID | Criterion | Acceptance Condition |
|---|---|---|
| UAT-03.1 | Task created | **Given** a title, priority and deadline, **when** the student saves the task, **then** it appears in the **To Do** column without requiring a page refresh. |
| UAT-03.2 | Required fields enforced | **Given** a missing title or deadline, **when** save is attempted, **then** submission is blocked and a field-level validation message is displayed. |
| UAT-03.3 | Priority assignable | **Given** a new or existing task, **when** the student sets priority to Low, Medium or High, **then** the value persists and is reflected in dashboard sort order. |
| UAT-03.4 | Task editable | **Given** an existing task, **when** the student edits any field and saves, **then** the updated values persist after a page refresh. |
| UAT-03.5 | Optional notes supported | **Given** any task, **when** the student adds a freeform note, **then** the note is saved and is visible in the task detail panel. |

### UAT-04 — Status Management

| ID | Criterion | Acceptance Condition |
|---|---|---|
| UAT-04.1 | Status transitions persist | **Given** a task in any column, **when** the student moves it to To Do, In Progress or Completed, **then** the new status persists and the task renders in the correct column. |
| UAT-04.2 | Status change is logged | **Given** any status change, **when** the `task_status_history` table is inspected, **then** a row exists recording the previous status, the new status, and a timestamp. |
| UAT-04.3 | Overdue is system-derived | **Given** a task past its deadline that is not Completed, **when** the dashboard renders, **then** the task is visually flagged as overdue without the student having set that state manually. |

### UAT-05 — Incomplete Tasks and Reflection

| ID | Criterion | Acceptance Condition |
|---|---|---|
| UAT-05.1 | Reflective remark is mandatory | **Given** a task being marked Incomplete, **when** the student attempts to save without entering a reflective remark, **then** the action is blocked and the remark field is flagged. |
| UAT-05.2 | Reflection persisted | **Given** a reflective remark has been entered, **when** the task is archived, **then** the remark is stored and is retrievable from Task History. |
| UAT-05.3 | Incomplete panel visually distinct | **Given** the Incomplete task detail panel is opened, **when** compared to the standard task detail panel, **then** it is visually differentiated. |
| UAT-05.4 | Reopen supported | **Given** an archived Incomplete task, **when** the student reopens it, **then** it returns to an active column and the reopen event is written to `task_status_history`. |

### UAT-06 — Task History

| ID | Criterion | Acceptance Condition |
|---|---|---|
| UAT-06.1 | Archive accessible | **Given** completed and incomplete tasks exist, **when** the student opens Task History, **then** both appear in the archive list. |
| UAT-06.2 | Filtering works | **Given** the Task History list, **when** the student filters by Complete or Incomplete, **then** only matching tasks are displayed. |
| UAT-06.3 | Reflection visible in archive | **Given** an Incomplete task in Task History, **when** it is opened, **then** the original reflective remark is displayed. |

### UAT-07 — Account Management

| ID | Criterion | Acceptance Condition |
|---|---|---|
| UAT-07.1 | Password change | **Given** an authenticated student, **when** the password is changed with correct current-password confirmation, **then** the new password succeeds on next login and the previous password fails. |
| UAT-07.2 | Personal details update | **Given** an authenticated student, **when** name or email is updated, **then** the change persists and is reflected in the UI. |

### UAT-08 — Non-Functional Acceptance

| ID | Criterion | Acceptance Condition |
|---|---|---|
| UAT-08.1 | Responsive layout | **Given** the application is opened at 375px, 768px and 1440px viewport widths, **when** each view is inspected, **then** the layout is usable with no horizontal scrolling and no overlapping elements. |
| UAT-08.2 | Dashboard performance | **Given** a student account with 50 tasks, **when** the dashboard is requested from the deployed environment, **then** it renders in under 3 seconds. |
| UAT-08.3 | Data isolation between users | **Given** two registered students, **when** Student A is authenticated, **then** no task belonging to Student B is retrievable via the UI or the API. |
| UAT-08.4 | HTTPS enforced | **Given** the deployed application, **when** it is accessed over HTTP, **then** the request is redirected to HTTPS and served with a valid certificate. |
| UAT-08.5 | Availability | **Given** the deployed environment, **when** it is accessed publicly during the assessment window, **then** the application is reachable and functional. |

---

## 6. Acceptance Gate

The system is **accepted** by the client when:

- All criteria in **UAT-01** through **UAT-07** pass, **and**
- **UAT-08.3** (data isolation) and **UAT-08.4** (HTTPS) pass.

**UAT-08.1**, **UAT-08.2** and **UAT-08.5** are acceptance-desirable. Failure of any of these is recorded as a defect and scheduled for remediation, but does not block sign-off.

---

## 7. Results Log

To be completed during the UAT execution phase.

| ID | Result | Date Tested | Evidence | Notes |
|---|---|---|---|---|
| UAT-01.1 | | | | |
| UAT-01.2 | | | | |
| UAT-01.3 | | | | |
| UAT-01.4 | | | | |
| UAT-02.1 | | | | |
| UAT-02.2 | | | | |
| UAT-02.3 | | | | |
| UAT-02.4 | | | | |
| UAT-03.1 | | | | |
| UAT-03.2 | | | | |
| UAT-03.3 | | | | |
| UAT-03.4 | | | | |
| UAT-03.5 | | | | |
| UAT-04.1 | | | | |
| UAT-04.2 | | | | |
| UAT-04.3 | | | | |
| UAT-05.1 | | | | |
| UAT-05.2 | | | | |
| UAT-05.3 | | | | |
| UAT-05.4 | | | | |
| UAT-06.1 | | | | |
| UAT-06.2 | | | | |
| UAT-06.3 | | | | |
| UAT-07.1 | | | | |
| UAT-07.2 | | | | |
| UAT-08.1 | | | | |
| UAT-08.2 | | | | |
| UAT-08.3 | | | | |
| UAT-08.4 | | | | |
| UAT-08.5 | | | | |

---

## 8. Revision History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 11 July 2026 | Jove | Initial UAT criteria defined |