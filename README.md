# CareFlow Grievance Module

A professional Healthcare Incident Submission & Management System built with Next.js (App Router), Material UI, and Server Actions.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material UI (MUI)
- **Icons**: Lucide React
- **Form Management**: React Hook Form
- **Validation**: Zod
- **State Management**: React Hooks & Server Actions
- **Utilities**: Date-fns, UUID

## Folder Structure

- `app/dashboard/`: Incident management dashboard with filtering and search.
- `app/grievance/create/`: Multi-step incident submission form.
- `components/form/`: Reusable form inputs integrated with React Hook Form.
- `components/ui/`: Shared UI components like the Stepper.
- `lib/server-actions/`: Server-side logic for data persistence.
- `lib/validations/`: Centralized Zod schemas for form validation.
- `types/`: TypeScript definitions for the grievance domain.

## Design Decisions

1. **Multi-Step Form**: Used a step-by-step approach to reduce cognitive load on reporters. Each step is validated independently using Zod.
2. **Draft Functionality**: Implemented a "Save as Draft" feature that persists data to a mock server-side store, allowing users to resume later.
3. **Server Actions**: Used for all data operations (create, update, fetch) to leverage Next.js's built-in server-side capabilities and simplify client-server communication.
4. **MUI Integration**: Chose MUI for its robust component library and professional look, which is well-suited for healthcare applications.
5. **Responsive Dashboard**: The dashboard includes pagination, status filtering, and title search for efficient incident management.

## Assumptions Made

- **Mock Storage**: Since a real database was not specified, a server-side in-memory mock store is used. In a production environment, this would be replaced with a database like PostgreSQL or Firestore.
- **File Uploads**: The file upload UI is a visual representation. Actual file handling would require integration with a storage service like AWS S3 or Firebase Storage.
- **Authentication**: The system assumes an authenticated context. In a real app, reporter details might be auto-populated from the user's profile.

## Setup Instructions

1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
