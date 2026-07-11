# Software Requirements Specification
## Functional Requirements

The following functional requirements have been derived from stakeholder 
consultation with Fander University and define the core behaviours the 
Task Manager application must support.

### FR-1: User Registration
The system shall allow a new user to create an account using an email 
address and password.
- **Input:** Full name, university email, password, password confirmation
- **Output:** Confirmation of account creation; user redirected to login
- **Priority:** High

### FR-2: User Login
The system shall allow a registered user to authenticate using their 
email and password.
- **Input:** Email, password
- **Output:** Authenticated session; redirect to dashboard
- **Priority:** High

### FR-3: Create Task
The system shall allow an authenticated user to create a new task.
- **Input:** Task title, description, due date, priority, status
- **Output:** New task saved and visible in task list
- **Priority:** High

### FR-4: Edit Task
The system shall allow a user to modify the details of an existing task 
they own.
- **Input:** Updated task fields
- **Output:** Task record updated; changes reflected in task list
- **Priority:** High

### FR-5: Delete Task
The system shall allow a user to permanently remove a task they own.
- **Input:** Task selection, delete confirmation
- **Output:** Task removed from task list and database
- **Priority:** Medium

### FR-6: Set Task Priority
The system shall allow a user to assign a priority level (e.g. Low, 
Medium, High) to a task.
- **Input:** Selected priority value
- **Output:** Task list reflects updated priority; supports sorting/filtering
- **Priority:** Medium

### FR-7: Set Task Status
The system shall allow a user to update the status of a task. Valid 
status values are: Backlog, Ongoing, Complete, and Incomplete (a task 
whose due date has passed without being marked Complete).
- **Input:** Selected status value
- **Output:** Task list reflects updated status; Incomplete tasks are 
  visually distinguished from other statuses (see FR-11)
- **Priority:** High

### FR-8: Add Notes/Remarks
The system shall allow a user to attach optional, freeform notes or 
remarks to any task, regardless of status.
- **Input:** Text note
- **Output:** Note saved and displayed alongside the task
- **Priority:** Low

### FR-11: Mandatory Reflective Remarks on Incomplete Tasks
The system shall require a student to submit a reflective remark before 
a task marked Incomplete can be archived or closed. This reflection is 
distinct from the general Notes field (FR-8) and must capture what 
prevented timely completion and what the student intends to do 
differently in future.
- **Input:** Reflective remark (required, minimum length enforced)
- **Output:** Reflection saved against the task record; task cannot be 
  archived until this field is completed
- **Rationale:** Encourages genuine self-assessment and learning from 
  missed deadlines, rather than allowing incomplete tasks to be silently 
  dismissed.
- **Priority:** High

### FR-12: Task Dashboard / Overview
The system shall display an authenticated user's tasks in a single 
overview view upon login, grouped or filterable by status (Backlog, 
Ongoing, Complete, Incomplete).
- **Input:** None (auto-populated on login); optional filter/sort selection
- **Output:** List of the user's tasks, with tasks in Incomplete status 
  visually distinguished from other statuses
- **Rationale:** Provides the student a single point of reference to 
  track outstanding work and immediately identify missed deadlines 
  requiring reflection (per FR-11)
- **Priority:** High


## Non-Functional Requirements
