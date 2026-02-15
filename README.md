# Music Player App

A full-stack music player application with a React frontend and Node.js/Express backend. Users can sign up, log in, manage their profiles, search for songs, create playlists, and play music.

## Features

### Frontend (React + Vite)
- User authentication (signup, login, reset password)
- Profile management
- Song search and filtering
- Playlist creation and management
- Responsive music player UI
- Modern design with Tailwind CSS

### Backend (Node.js + Express)
- RESTful API for user and song management
- JWT-based authentication
- MongoDB database integration
- Email notifications (e.g., password reset)
- Image and file handling

## Project Structure

```
backend/
  controllers/        # API controllers
  middleware/         # Express middleware
  models/             # Mongoose models
  routes/             # API routes
  utils/              # Utility functions
  config/             # Configuration files
  index.js            # Entry point
frontend/
  src/
    components/       # React components
    css/              # Component styles
    hooks/            # Custom React hooks
    pages/            # Page components
    redux/            # Redux store and slices
    assets/           # Static assets
    utils/            # Frontend utilities
  public/             # Static files
  index.html          # Main HTML file
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (e.g., MongoDB URI, JWT secret) in a `.env` file.
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
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

### Environment Variables
- Backend: Create a `.env` file in the backend directory with necessary variables (see `config/` for details).
- Frontend: Configure API endpoints if needed (see `src/utils/helper.js`).

## Scripts
- `npm start` (backend): Starts the backend server
- `npm run dev` (frontend): Starts the React development server

## Technologies Used
- Frontend: React, Vite, Redux, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT

## License
This project is licensed under the MIT License.
