# Backend - Industry Training Portal

This is the Flask backend for the Industry Training Portal.

## How to Run

1. **Navigate to the backend directory**:
   ```bash
   cd industry-training-portal/backend
   ```

2. **Activate the Virtual Environment**:
   - **Windows**:
     ```powershell
     .\venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

3. **Install Dependencies** (if not already installed):
   ```bash
   pip install flask flask-cors
   ```

4. **Run the Application**:
   ```bash
   python app.py
   ```

The backend will be available at `http://127.0.0.1:5000`.

## API Endpoints

- `GET /`: Health check
- `POST /api/login`: User login
- `POST /api/signup`: User registration
- `GET /api/courses`: Fetch all courses
- `POST /api/courses`: Add a new course (Faculty)
- `DELETE /api/courses/<id>`: Delete a course
- `GET /api/faculty`: Fetch faculty list
- `GET /api/students`: Fetch student list
- `GET /api/faculty/analytics`: Fetch faculty dashboard data
