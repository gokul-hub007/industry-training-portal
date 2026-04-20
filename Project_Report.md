# Industry Training Portal - Final Project Report

## 1. Project Overview & Status
**Status:** 100% Complete
The Industry Training Portal is a fully functional full-stack web application designed to facilitate online learning and course management. It allows users to register as students or faculty, browse courses, manage enrollments, and provides an administrative and analytical dashboard for faculty members. Since all core requirements (Backend API, UI, Auth, Database Integrations, CRUD operations, and Deployment setups) are completely implemented, the project is considered 100% finished.

## 2. Technology Stack
- **Frontend:** React.js, Vite, React Router DOM, Tailwind CSS (or standard CSS), Lucide React (Icons).
- **Backend:** Python, Flask, Flask-CORS, Flask-SQLAlchemy.
- **Database:** SQLite (local development) / PostgreSQL (production via `psycopg2-binary`).
- **Deployment & Hosting Configurations:** configuration files available for Vercel (`vercel.json`) and Render (`render.yaml`).

## 3. Core Features
### User Authentication & Role Management
- Secure Login and Registration system.
- Role-based Access Control (Students, Faculty, Admin).
- Protected application routes (Dashboard, Profile, Edit Profile, Add Course).

### Faculty Features
- Add, update, and delete courses.
- Dedicated Dashboard showing analytics (Total Students, Ratings, Enrollments).
- Faculty registry management.

### Student Features
- Browse available courses.
- Enroll in courses.
- View personalized learning progress in Dashboard.

### Additional Features
- Interactive UI with Particles Background.
- Contact Form with Database storage and Email Notification (SMTP Integration).
- Graceful Error Handling and Notifications.

## 4. Project Architecture
The project follows a standard decoupled Client-Server architecture.
```text
industry-training-portal/
├── backend/                  # Python Flask API & DB
│   ├── app.py                # Main backend entry point, API routes, DB Models
│   ├── portal.db             # Local SQLite database
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # Backend setup guide
├── src/                      # React Frontend
│   ├── api/                  # API client setup (apiClient.js)
│   ├── components/           # Reusable UI components (Navbar, Footer, CourseCard)
│   ├── pages/                # Main views (Home, Dashboard, Faculty, Login, etc.)
│   ├── hooks/                # Custom React hooks (useScrollReveal.js)
│   ├── App.jsx               # Main React Application & Routing
│   └── main.jsx              # React DOM render entry
├── package.json              # NPM dependencies & scripts
├── vite.config.js            # Vite build configuration
├── render.yaml               # Backend hosting config for Render
└── vercel.json               # Frontend deployment config for Vercel
```

## 5. Database Schema (SQLAlchemy Models)
The application handles structured relational data across five primary tables:
1. **User:** `id`, `email`, `password`, `name`, `role`
2. **Course:** `id`, `title`, `instructor`, `duration`, `rating`, `students`, `image`, `tags`, `video_url`
3. **FacultyMember:** `id`, `name`, `role`, `bio`
4. **StudentRegistry:** `id`, `name`, `email`, `course`, `progress`
5. **ContactMessage:** `id`, `name`, `email`, `message`, `timestamp`, `is_read`

## 6. API Endpoints Map
- `GET /` - API Health check.
- `POST /api/login` - Authenticate user and return session info.
- `POST /api/signup` - Register a new user (handles role assignment).
- `GET /api/courses` - Fetch the catalog of all courses.
- `GET /api/courses/<id>` - Retrieve specific course details.
- `POST /api/courses` - Add a new course.
- `DELETE /api/courses/<id>` - Delete a course.
- `POST /api/enroll` - Enroll a student in a specific course.
- `GET /api/faculty` - List all faculty members.
- `GET /api/faculty/analytics` - Fetch dashboard metrics (students count, peer ratings).
- `GET /api/students` - List all student profiles and progress.
- `POST /api/contact` - Save user inquiries and trigger email via SMTP.

## 7. Setup & Execution Instructions
### Starting the Backend
1. Navigate to the `backend` directory.
2. Activate a Python virtual environment: `python -m venv venv` and `source venv/bin/activate` (`venv\Scripts\activate` on Windows).
3. Install dependencies: `pip install -r requirements.txt`.
4. Run the server: `python app.py`. The backend runs at `http://127.0.0.1:5000`.

### Starting the Frontend
1. Navigate to the root directory `industry-training-portal`.
2. Install Node.js packages: `npm install`.
3. Start the Vite development server: `npm run dev`.
4. Open the provided `localhost` URL in the browser (usually `http://localhost:5173`).

## 8. Conclusion
The **Industry Training Portal** is structurally robust, with comprehensive testing potential enabled by SQLite mock-ups. Features operate synchronously emphasizing a great User Experience and a well-scaled Rest API serving reliable JSON architectures. The project satisfies all parameters required for a final project delivery.
