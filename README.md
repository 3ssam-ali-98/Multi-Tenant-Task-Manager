# Multi-Tenant Task Management API

A Django REST Framework backend API for multi-tenant organization and task management with JWT authentication, role-based permissions, organization isolation, and task workflows.

This project demonstrates:

* Multi-tenant backend architecture
* Role-based access control (RBAC)
* JWT authentication
* Organization/member/task relationships
* Field-level permissions
* Custom serializer validation
* Django admin customization

---

# Features

## Authentication

* User registration
* JWT login authentication
* Refresh token support
* Custom user model using email authentication

## Organizations

* Create organizations
* View organization details
* Update organization information
* Delete organizations
* Organization ownership system

## Memberships

* Add users to organizations
* Assign roles (`admin` / `member`)
* Prevent duplicate memberships
* Prevent organization owner removal/demotion

## Tasks

* Create organization tasks
* Assign tasks to organization members
* Task status workflow:

  * `todo`
  * `in_progress`
  * `done`
* Members can only update task status
* Admins can fully manage tasks

## Permissions & Security

* Multi-tenant organization isolation
* Role-based endpoint access
* Field-level update restrictions
* Organization membership validation
* Cross-organization protection

## Django Admin

Customized Django admin interface with:

* Search fields
* Filters
* Ordering
* Read-only fields
* Improved list displays

---

# Tech Stack

* Python
* Django
* Django REST Framework
* SimpleJWT
* SQLite

---

# Project Structure

```plaintext
accounts/
organizations/
tasks/
screenshots/
postman_collection.json
manage.py
README.md
```

---

# API Endpoints

## Authentication

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | `/api/register/`      | Register user     |
| POST   | `/api/login/`         | Login user        |
| POST   | `/api/token/refresh/` | Refresh JWT token |

---

## Organizations

| Method | Endpoint                       | Description             |
| ------ | ------------------------------ | ----------------------- |
| GET    | `/api/organizations/`          | List user organizations |
| POST   | `/api/organizations/`          | Create organization     |
| GET    | `/api/organizations/<org_id>/` | Get organization        |
| PATCH  | `/api/organizations/<org_id>/` | Update organization     |
| DELETE | `/api/organizations/<org_id>/` | Delete organization     |

---

## Memberships

| Method | Endpoint                                               | Description       |
| ------ | ------------------------------------------------------ | ----------------- |
| GET    | `/api/organizations/<org_id>/memberships/`             | List memberships  |
| POST   | `/api/organizations/<org_id>/memberships/`             | Add membership    |
| PATCH  | `/api/organizations/<org_id>/memberships/<member_id>/` | Update membership |
| DELETE | `/api/organizations/<org_id>/memberships/<member_id>/` | Delete membership |

---

## Tasks

| Method | Endpoint                                       | Description |
| ------ | ---------------------------------------------- | ----------- |
| GET    | `/api/organizations/<org_id>/tasks/`           | List tasks  |
| POST   | `/api/organizations/<org_id>/tasks/`           | Create task |
| GET    | `/api/organizations/<org_id>/tasks/<task_id>/` | Get task    |
| PATCH  | `/api/organizations/<org_id>/tasks/<task_id>/` | Update task |
| DELETE | `/api/organizations/<org_id>/tasks/<task_id>/` | Delete task |

---

# Permission Rules

## Organization Permissions

| Role   | Permissions                  |
| ------ | ---------------------------- |
| Owner  | Full organization control    |
| Admin  | Manage memberships and tasks |
| Member | Limited task access          |

---

## Task Permissions

### Admin

* View all organization tasks
* Create tasks
* Edit all task fields
* Delete tasks

### Member

* View only assigned tasks
* Update task status only

---

# Validation Rules

* Assigned task users must belong to the same organization
* Organization owners cannot be deleted
* Organization owners cannot be demoted
* Duplicate memberships are blocked
* Unauthorized cross-organization access is blocked

---

# Django Admin Features

Customized admin panels include:

* Search functionality
* Filters
* Ordering
* Read-only timestamps
* Improved relationship displays

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

---

## Create Virtual Environment

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\\Scripts\\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Apply Migrations

```bash
python manage.py migrate
```

---

## Create Superuser

```bash
python manage.py createsuperuser
```

---

## Run Server

```bash
python manage.py runserver
```

---

# Authentication

This project uses JWT authentication.

After login:

1. Copy the returned access token
2. Add it to request headers:

```plaintext
Authorization: Bearer <your_access_token>
```

---

# Testing

The API was manually tested using Postman for:

* Authentication
* Organization access isolation
* Role permissions
* Membership restrictions
* Task validation
* Field-level authorization
* Cross-organization protection

---

# Postman Collection

A complete Postman collection is included in the repository:

```plaintext
postman_collection.json
```

The collection contains:

* Authentication endpoints
* Organization endpoints
* Membership endpoints
* Task endpoints

Import into Postman to test the API locally.

---

# Screenshots

Project screenshots are available in:

```plaintext
screenshots/
```

Includes:

* Django admin panels
* Postman authentication tests
* Permission validation examples

---

# Future Improvements

Potential future enhancements:

* Docker support
* Pagination
* Search/filter APIs
* Activity logs
* Task comments
* Due dates
* Notifications
* Deployment
* Automated testing

---

# Author

Essam Eldin Ali

