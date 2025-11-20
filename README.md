# Physics Wallah Vouchers

A dynamic and responsive web application for managing and displaying Physics Wallah course offers, coupons, and notices. This project features a modern frontend with a robust backend for content management.

## 🌐 Live Demo

**Website**: [https://pw-discount.vercel.app/](https://pw-discount.vercel.app/)

**Backend API**: [https://pw-discount.onrender.com](https://pw-discount.onrender.com)

> **Note**: The backend (hosted on Render free tier) may take ~30 seconds to wake up on the first request after inactivity.

## Features

### 1. Dynamic Hero Section
- **Main Hero**: A top-level hero section managed via the Admin Dashboard ("Main Div"). Supports custom headlines, subheadlines, offer codes, and background images/media.
- **Stacked Hero Images**: Additional hero banners can be added and will stack below the main section.
- **Media Support**: Supports Images, Videos (MP4/WebM), PDFs, and Google Drive links.

### 2. Dynamic Course Offers
- **Searchable Table**: A responsive table listing all available courses with search functionality.
- **Copy Code**: One-click copy button for discount codes.
- **Show More/Less**: Pagination to keep the UI clean.
- **Admin Management**: Full CRUD operations for course offers via the "Course Offers" tab in the Admin Dashboard.

### 3. Admin Dashboard
- **Secure Access**: Protected route for administrators.
- **Content Management**:
  - **Main Div**: Manage the primary hero section.
  - **Hero Images**: Add/Edit/Delete stacked hero banners.
  - **Course Offers**: Manage the list of courses and discounts.
  - **Notices**: Post updates to the sidebar notice board.

### 4. Responsive Design
- **Mobile-First**: Fully responsive layout that adapts to Mobile, Tablet, and Desktop screens.
- **Modern UI**: Glassmorphism effects, smooth transitions, and a clean, minimalist aesthetic.

### 5. Community Integration
- **Social Links**: Direct links to official Physics Wallah social media channels (Instagram, WhatsApp, Telegram, Reddit).
- **Website Link**: Quick access to the official website.

## Tech Stack

- **Frontend**: React, Vite, React Router, React Icons
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Styling**: Vanilla CSS with CSS Variables for a consistent design system

## Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas connection string)

### Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory with the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CORS_ORIGIN=http://localhost:5173,http://localhost:3000
   ```
4. Seed the database with initial course categories (Optional):
   ```bash
   node seedCategories.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Local Development
1. **Home Page**: Visit `http://localhost:5173` (or your configured port) to view the website.
2. **Admin Panel**: Navigate to `/admin/login` to access the dashboard.

### Production
- **Live Site**: [https://pw-discount.vercel.app/](https://pw-discount.vercel.app/)
- **Admin Panel**: [https://pw-discount.vercel.app/admin/login](https://pw-discount.vercel.app/admin/login)

## Deployment

### Frontend (Vercel)
- Deployed at: [https://pw-discount.vercel.app/](https://pw-discount.vercel.app/)
- Auto-deploys on push to `main` branch
- Environment variable required: `VITE_API_URL=https://pw-discount.onrender.com/api`

### Backend (Render)
- Deployed at: [https://pw-discount.onrender.com](https://pw-discount.onrender.com)
- Auto-deploys on push to `main` branch
- Environment variables required:
  - `PORT=5000`
  - `MONGODB_URI=<your_mongodb_atlas_uri>`
  - `JWT_SECRET=<your_secret_key>`
  - `FRONTEND_URL=https://pw-discount.vercel.app`

## Project Structure

- `frontend/`: React application source code.
  - `src/components/`: Reusable UI components (HeroSection, OffersTable, etc.).
  - `src/pages/`: Page components (Home, AdminDashboard).
  - `src/services/`: API integration logic.
  - `src/styles/`: Global CSS and design system.
- `Backend/`: Node.js/Express API.
  - `models/`: Mongoose schemas (MainDiv, CourseCategory, HeroImage, etc.).
  - `routes/`: API route handlers.
