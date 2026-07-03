# SD204B - Student Task Manager

> Cloud Application Development Assessment · Yoobee College · Diploma in Software Development Year 2

## Overview

A full-stack task management web application built for Fander University students to manage and prioritise their academic and personal tasks. Built as part of the SD204B Cloud Application Development course assessment.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Version Control | Git + Github |
| Lo-Fi Wireframe | Frame0 |
| Hi-Fi Wireframe | Figma|
| Prototype and UAT | Maze + Figma Prototype |
| Frontend | React + Vite + TypeScript + Tailwind CSS | 
| Backend | Python + Flask | 
| Database | PostgreSQL |
| Cloud | AWS |
| Project Management | Jira |
| Documentation | Obsidian |
| Functional Testing | Postman |
| Unit Testing | Pytest |


## Features

- User registration and login
- Create, edit, and delete tasks
- Set task priority - Low, Medium, High
- Set task status - Yet-to-do, On-going, Completed
- Add images/notes
- Update personal details and password
- Secure logout
- Reflective notes for overdue/incomplete tasks

## Project Structure

```
cloud-app-dev-project/
├── backend/
│   ├── app.py
│   ├── models/
│   ├── routes/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
│   └── package.json
├── docs/
│   ├── project-plan.md
│   ├── SRS.md
│   ├── api-endpoints.md
│   ├── aws-cost-estimate.md
│   └── diagrams/
│       ├── use-case.png
│       ├── class-diagram.png
│       └── activity-diagram.png
├── wireframes/
│   └── (Figma exports)
└── README.md
```

## Documentation

- [Project Plan](docs/project-plan.md)
- [Software Requirements Specification](docs/SRS.md)
- [API Endpoints](docs/api-endpoints.md)
- [Wireframes](wireframes/) - [Figma Link](#)

## AWS Deployment ?

- **Compute:** AWS EC2 / Elastic Beanstalk
- **Database:** AWS RDS (PostgreSQL)
- **Static Assets:** AWS S3
- **Security:** AWS IAM + ACM (SSL/HTTPS)
- **Monitoring:** AWS CloudWatch

> Live URL: *(added after deployment)*

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL
- AWS account (free tier)

### Local Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/student-task-manager.git

# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env
flask run

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## Assessment

**Course:** 204B Cloud Application Development · Level 6
**Institution:** Yoobee College of Creative Innovation  
**Due:** September 13, 2026  

## Author

**Jove** · Diploma in Software Development · Yoobee College NZ  
GitHub: [@Owshuhnee](#)

---

*This project is an individual academic assessment. All work is original.*