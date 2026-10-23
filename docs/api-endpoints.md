# API Endpoints

The base path is `/api`. Authentication uses a Flask-Login session cookie, so requests must be sent with credentials (`credentials: 'include'`). Endpoints marked 🔒 return `401 {"error": "Authentication required"}` without a valid session.

## Auth and account

| Method | Endpoint | Body | Success | Errors |
|---|---|---|---|---|
| POST | `/api/register` | `name`, `email`, `password` | `201` user, logged in | `400` missing fields · `409` email already exists |
| POST | `/api/login` | `email`, `password` | `200` user | `401` incorrect email or password |
| POST | `/api/logout` 🔒 | none | `200` | `401` |
| GET | `/api/me` 🔒 | none | `200` user | `401` |
| PATCH | `/api/me` 🔒 | `name` and/or `email` | `200` updated user | `409` email already in use |
| PATCH | `/api/me/password` 🔒 | `currentPassword`, `newPassword` | `200` | `400` blank field · `401` current password incorrect |

User object: `{ "id": 2, "name": "Jove", "email": "jove@fander.com" }`

## Tasks

All task endpoints are 🔒 and only ever return or change the logged-in user's own tasks. Another user's task ID returns `404`.

| Method | Endpoint | Body | Success | Errors |
|---|---|---|---|---|
| GET | `/api/tasks` | none | `200` list of tasks, newest first | `401` |
| POST | `/api/tasks` | `title` (required), `description`, `status`, `priority`, `due_date`, `notes`, `reflection` | `201` task | `400` title is required |
| PUT/PATCH | `/api/tasks/<id>` | any task fields | `200` updated task | `404` task not found |
| DELETE | `/api/tasks/<id>` | none | `200` | `404` task not found |

Task object:

```json
{
  "id": 12,
  "title": "UI/UX Model",
  "description": "Create the hi-fi wireframes",
  "due_date": "2026-09-13",
  "priority": "Medium",
  "status": "Backlog",
  "notes": null,
  "reflection": null
}
```

- `status`: `Backlog` (shown as "To do"), `Ongoing` ("In Progress"), `Complete`, `Incomplete`
- `priority`: `Low`, `Medium`, `High`
- `due_date`: `YYYY-MM-DD`

## Health check

| Method | Endpoint | Success |
|---|---|---|
| GET | `/api/health` | `200 {"status": "ok"}` |
