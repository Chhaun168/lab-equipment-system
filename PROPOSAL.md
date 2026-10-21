# Lab Equipment Lending System

## Problem
Students at our university often need specialized equipment for coursework and lab projects (such as microcontrollers, development boards, sensors, and laptops), but the current manual tracking process makes it hard to see what items are currently available. Lab assistants also struggle to keep track of borrowed items, leading to lost equipment and overdue returns.

## Users and roles
- **Student**: Browses available lab equipment, submits requests to borrow items, and views their active loans and borrowing history.
- **Lab Assistant (Admin)**: Manages equipment listings (creates, updates, soft-deletes items), approves or rejects borrowing requests, and tracks returned items.

## User stories
1. **As a Student**, I want to browse the list of lab equipment with their current availability status, so that I know what is ready to borrow.
2. **As a Student**, I want to submit a loan request for available equipment with start and end dates, so that I can borrow it for my lab project.
   - *Accepted when*: The system validates that the selected dates are valid (start date is not in the past, end date is after start date); the equipment is currently available; a pending loan record is created with a `PENDING` status.
3. **As a Student**, I want to view my current loan requests and borrowing history, so that I can track when my borrowed items are due back.
   - *Accepted when*: The page shows only loans belonging to the logged-in student; the list accurately displays the loan status (`PENDING`, `APPROVED`, `RETURNED`, `REJECTED`); empty state is handled cleanly when no loans exist.
4. **As a Lab Assistant**, I want to review pending loan requests and approve or reject them, so that I can manage who gets access to the equipment.
   - *Accepted when*: The assistant can see all student requests; approving changes the loan status to `APPROVED` and marks equipment as unavailable; rejecting changes status to `REJECTED` with an optional reason; unauthorized non-admin users get a 403 response.
5. **As a Lab Assistant**, I want to create, edit, or delete equipment items in the system, so that the lab inventory stays accurate.
6. **As a Lab Assistant**, I want to mark an approved loan as returned, so that the equipment becomes available for other students to borrow again.
7. **As a Student**, I want to filter equipment by category (e.g., Microcontrollers, Sensors, Accessories), so that I can quickly find what I need.
8. **As a Lab Assistant**, I want to mark equipment as damaged or under maintenance, so that students cannot request it.

## MVP scope
- **Must have**: User registration/login with roles (Student/Lab Assistant), browse equipment list, submit loan request, approve/reject request, mark items returned, basic equipment management (CRUD), and loan history.
- **Nice to have**: Filter by equipment category, equipment search bar, and equipment maintenance status tags.

## Entities

| Entity | Main attributes | Relations |
|---|---|---|
| **User** | id, name, email, passwordHash, role (`STUDENT`, `LAB_ASSISTANT`), createdAt | Has many `Loan` records |
| **Category** | id, name, description | Has many `Equipment` items |
| **Equipment** | id, name, categoryId, description, status (`AVAILABLE`, `MAINTENANCE`), totalQty | Belongs to `Category`, has many `Loan` records |
| **Loan** | id, userId, equipmentId, startDate, endDate, status (`PENDING`, `APPROVED`, `REJECTED`, `RETURNED`), createdAt | Belongs to `User`, belongs to `Equipment` |

## Stretch feature
- **Scheduled task**: A background cron job running daily on the backend (using NestJS `@nestjs/schedule`) to scan the database for active loans where `endDate` is before the current date and automatically update their status to `OVERDUE` while generating log alerts for the Lab Assistant.

## Repository
https://github.com/Chhaun168/lab-equipment-system.git