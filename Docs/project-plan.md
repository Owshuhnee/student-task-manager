# Project Plan
## 1.0 Project overview

---

## 2.0 Business Requirements

---

## 3.0 Development scope and timeline
---

### 3.1 In scope
- Task CRUD (Create, Read, Update, Delete) 
- User Registration, Authentication, Login/Logout
- Task Priority and Status management
- Images/Notes attachments
- Reflective notes for tasks (what went well, what did not)
- Update user password and account details
- Responsive UI
- Cloud deployment

### 3.2 Out of scope
- Collaborative task sharing
- Notifications/Reminders
- Native mobile app
- Calendar Integrations

### 3.3 Project Timeline

---
## 4.0 Resources

---
## 5.0 Cloud Services Projected Costs

---
## 6.0 User acceptance test criteria

---

## 7.0 Tools and Technologies
### 7.1 Collaborative Tools

| Purpose            | Tools                    | Justification |
| ------------------ | ------------------------ | -------------- |
| Lo-fidelity Wireframe       | Frame0                    | Quick low-fidelity screen layouts before committing time to full wireframes |
| Hi-Fidelity    | Figma                    | Industry-standard tool for hi-fi wireframes and clickable prototypes; supports collaborative review |
| Prototype          | Figma                    | Same platform as wireframes keeps design iteration in one place, no format conversion needed |
| User testing       | Maze                     | Connects directly to Figma prototypes for usability testing with recruited testers |
| Functional Testing  | Postman | Lightweight in-editor (Thunder Client) and standalone (Postman) tools for manually verifying REST API endpoints during development |
| Version Control    | Git + GitHub             | Industry-standard distributed version control; GitHub also serves as a live portfolio artefact |
| Project Management | GitHub Projects          | Kept in the same ecosystem as version control, avoiding the overhead of a separate tool (e.g. Jira) for a solo project |
| Documentation       | Obsidian + GitHub MD     | Obsidian for structured working notes and daily logs; GitHub-flavoured Markdown ensures all docs render correctly on GitHub |

### 7.2 Coding Languages and Technology

| Layer    | Technology         | Justification |
| -------- | ------------------ | -------------- |
| IDE      | VS Code             | Lightweight, strong extension support for React/Flask/Python development |
| Backend  | Python 3.11+ / Flask | Lightweight framework, minimal boilerplate for a REST API; Django considered but ruled out. It's used in coursework only as a teaching vehicle for REST concepts, not required for this project |
| Frontend | React + Vite + TypeScript | Vite produces a static build deployable directly to AWS S3; Next.js was considered but rejected as it requires a running Node server on AWS, adding unnecessary infrastructure complexity given the deadline |
| Styling  | Tailwind CSS        | Utility-first styling speeds up UI development without writing custom CSS for every component |
| Database | PostgreSQL          | Relational structure suits task/status/history relationships (e.g. task_status_history); managed easily via AWS RDS |
| API      | REST (Flask)        | Simple, well-understood pattern for CRUD operations between frontend and backend; matches coursework REST concepts |

### 7.3 Cloud Service Provider

AWS – Develop, Deploy, Monitor

| Service | Role | Justification |
| ------- | ---- | ------------- |
| EC2 / Elastic Beanstalk | Application hosting for the Flask backend | Elastic Beanstalk simplifies deployment/scaling management without needing to hand-configure a full EC2 instance |
| RDS (PostgreSQL) | Managed relational database | Removes manual database administration overhead (backups, patching) so more time can go toward B5 deployment work |
| S3 | Static hosting for the React/Vite frontend build | Vite's static output deploys directly to S3, avoiding the cost/complexity of a running Node server |
| IAM | Access control for AWS resources | Enforces least-privilege access between services (e.g. backend-to-RDS, deployment credentials) |
| ACM | SSL/TLS certificate management | Enables HTTPS on the deployed app at no extra cost, required for secure login/session handling |
| CloudWatch | Monitoring and logging | Directly satisfies the "Monitoring" component of B5 (40% weighting) — tracks app health and errors post-deployment |

