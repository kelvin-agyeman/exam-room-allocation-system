# Exam Room Allocation System

[![Node.js Version](https://img.shields.io/badge/node-22.x-green.svg)](https://nodejs.org)
[![NPM Version](https://img.shields.io/badge/npm-10.x-red.svg)](https://nodejs.org)
[![Express Framework](https://img.shields.io/badge/express-5.x-blue.svg)](https://expressjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

The **Exam Room Allocation System** is a RESTful API designed to digitize and automate the process of examination scheduling and room allocation within academic institutions.

The system addresses the common challenge of students physically searching for their allocated examination rooms on classroom doors or static PDF documents before examinations. This often results in overcrowding, confusion, unnecessary stress, and disruptions during examinations. By providing students with instant access to their personalized exam schedules and allocated venues, the system significantly improves the examination experience while streamlining exam management for staff.

The API follows industry-standard backend development practices and provides a scalable, secure, and maintainable architecture suitable for future expansion.

---

## Core Features

- Student, Staff, and Administrator authentication
- Role-based access control
- Exam creation and management
- Automatic room allocation using index number ranges
- Personalized exam lookup for students
- Dynamic exam status calculation (Upcoming, Ongoing, Completed)
- Search and filtering of examinations
- Student profile update request and approval workflow
- Forgot and Reset Password functionality
- Request validation and sanitization
- Centralized error handling
- Interactive API documentation using OpenAPI/Swagger
- Secure cookie-based authentication
- Database integration and persistence

---

## Technical Highlights

- JWT Authentication with HTTP-only cookies
- MongoDB data modeling with Mongoose
- Express Validator request validation
- Role-based authorization
- Password hashing using bcrypt
- Email delivery using Resend
- Centralized error handling middleware
- OpenAPI 3.0 documentation with Swagger UI

---

## Architecture

The application follows a layered architecture to promote separation of concerns, maintainability, and scalability.

- **Routes** define API endpoints and route incoming requests to the appropriate controllers.
- **Controllers** handle incoming requests, coordinate application flow, implement business logic, and generate responses.
- **Models** define database schemas and manage interactions with MongoDB.
- **Middleware** provides authentication, authorization, validation, rate limiting, and centralized error handling.
- **Validators** contain request validation rules using Express Validator to ensure incoming data is valid before reaching the controllers.
- **Services** encapsulate reusable business logic such as email delivery and other application services, keeping controllers clean and maintainable.
- **Utilities** provide reusable helper functions including JWT generation, cookie management, password hashing, token generation, and other shared utilities.

This architecture promotes clean code, reusability, easier testing, and long-term maintainability.

---

## Tech Stack

### Language

- JavaScript (ES Modules)

### Runtime Environment

- Node.js

### Backend Framework

- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Tokens (JWT)
- HTTP-only Cookies

### Validation

- Express Validator

### Email Service

- Resend

### API Documentation

- OpenAPI 3.0
- Swagger UI

### Deployment

- Render

---

## Requirements

Before running the project locally, ensure the following software is installed:

- Node.js (v22 or later)
- npm (v10 or later)
- Git
- MongoDB (or MongoDB Atlas)

---

## Installation

### Clone the repository

```bash
git clone https://github.com/kelvin-agyeman/exam-room-allocation-system.git
```

### Navigate into the project directory

```bash
cd exam-room-allocation-system
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file using the configuration below.

### Start the development server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root directory and provide values for the following variables:

```env
PORT=5000

NODE_ENV=development

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_LIFETIME=1d

RESEND_API_KEY=your_resend_api_key

CLIENT_URL=http://localhost:5173
```

> Replace the values above with your own configuration.

---

## API Documentation

Interactive API documentation is available through Swagger UI.

### Development

```text
http://localhost:5000/api-docs
```

### Production

```text
https://exam-room-allocation.onrender.com/api-docs
```

The documentation includes:

- Endpoint descriptions
- Authentication requirements
- Request examples
- Response schemas
- Example responses

---

## Authentication

Authentication is implemented using JSON Web Tokens stored in secure HTTP-only cookies.

### Authentication Flow

1. User submits valid login credentials.
2. The server verifies the credentials.
3. A signed JWT is generated.
4. The JWT is stored in a secure HTTP-only cookie.
5. Protected routes validate the token before granting access.

Authorization is enforced using role-based middleware for Students, Staff, and Administrators.

---

## Security Features

The application incorporates several security best practices:

- Password hashing using bcrypt
- JWT authentication with HTTP-only cookies
- Request validation using Express Validator
- Input sanitization
- Environment variable protection
- Centralized error handling
- CORS configuration
- API rate limiting on sensitive endpoints
- Secure HTTP headers using Helmet
- Protection against common web vulnerabilities

---

## Future Improvements

Potential future enhancements include:

- Email verification
- Push notifications for examination updates
- Examination timetable generation
- QR code-based examination verification
- Audit logging
- Automated testing
- Docker containerization
- CI/CD pipeline integration
- Redis caching
- Background job processing

---

## License

This project is licensed under the MIT License.

See the **LICENSE** file for additional information.
