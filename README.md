# CareFlow Grievance Module

A professional Healthcare Incident Submission & Management System built with Next.js (App Router), Material UI, and Server Actions.

## ✨ Key Features

- **Premium UI/UX Design**: Built with modern "Glassmorphism" aesthetics, subtle micro-animations using Framer Motion (`motion/react`), dynamic hover effects, and a highly polished professional color palette suited for enterprise healthcare software.
- **Offline-First / Optimistic UI**: Uses browser `IndexedDB` caching for offline support. Users can save drafts locally without an internet connection and seamlessly sync with the server database.
- **Advanced Dashboard**: Features a scalable `GrievanceTable` with built-in pagination, instant live-filtering by status, and full-text search capabilities across multiple fields (reporter name, employee ID, incident title). All logic is cleanly abstracted into a custom `useDashboard` hook.
- **Multi-Step Form Wizard**: A robust 4-step wizard (Reporter Details, Incident Details, Supporting Info, Review) with independent step validation, a clean stepper navigation UI, and draft save capabilities.
- **Robust Validation**: End-to-end type safety and form validation powered by `zod` and `react-hook-form`.
- **Reusable Component Architecture**: Heavy emphasis on DRY principles with extracted components like `StatCard`, `DashboardToolbar`, `ActionMenu`, `StatusChip`, and `EmptyState`.
- **Prettier & ESLint properly configured**: Fully clean and optimized linting setup configured for Next.js 15.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling & UI Components**: Material UI (MUI v5)
- **Animations**: Framer Motion
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Database/Storage Simulation**: Server Actions + IndexedDB (Local Storage cache)
- **Tooling**: ESLint, Prettier, TypeScript

## 📂 Folder Structure

- `app/dashboard/`: Main dashboard page managing the grievance table and statistics.
- `app/grievance/create/`: Multi-step incident submission form.
- `components/dashboard/`: Dashboard-specific UI fragments (`StatCard`, `GrievanceTable`, `DashboardToolbar`).
- `components/form/`: Reusable input wrappers connected to `react-hook-form`.
- `components/ui/`: Generic application building blocks (`Stepper`, `ActionMenu`).
- `hooks/`: Extracted business logic (`useDashboard`, `useGrievanceForm`).
- `lib/server-actions/`: Next.js Server Actions bridging the mock database.
- `lib/validations/`: Zod schemas.
- `lib/storage.ts`: Local `IndexedDB` implementation for the Offline-first UI.
- `lib/db.ts`: In-memory mock server database.

## 📐 Design Decisions & Patterns

1. **Custom Hooks Logic Extraction**: The dashboard and form features have their data-fetching, memoized computations, and event handling completely isolated into custom hooks (`useDashboard.ts`, `useGrievanceForm.ts`). This makes the React Views incredibly thin, readable, and highly scalable.
2. **Offline-First Synchronization**: To provide a snappy experience, deleting or saving drafts interacts with both the server database (`lib/db.ts`) and the local browser cache (`lib/storage.ts`).
3. **MUI with Premium Aesthetics**: We extended standard MUI components with `elevation={0}`, soft rounded borders (`borderRadius: 16px/20px`), backdrop filters, and subtle bounding shadows to break away from the "default" Material design and provide a bespoke, rich application feel.
4. **Optimized Image Overrides**: The application leverages `next/image` to intelligently render local base64/blob images without layout shifts, utilizing a custom local compression utility for large uploads.

## 🚀 Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧹 Code Quality Commands

- **Format Codebase**: `npm run format` (Runs Prettier)
- **Lint Codebase**: `npm run lint` (Runs ESLint)
