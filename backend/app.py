from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

# Database Configuration
# Database Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'portal.db')

if os.environ.get('VERCEL') or os.environ.get('AWS_LAMBDA_FUNCTION_NAME') or os.environ.get('RENDER'):
    # In Vercel/Lambda, we can only write to /tmp
    # NOTE: Data is ephemeral and will be lost on container restart
    import shutil
    tmp_db_path = '/tmp/portal.db'
    if not os.path.exists(tmp_db_path):
        if os.path.exists(db_path):
             try:
                shutil.copy2(db_path, tmp_db_path)
             except:
                pass
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + tmp_db_path
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# SQLite-specific configuration to prevent database locking
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'connect_args': {
        'timeout': 20,  # Increase timeout to 20 seconds
        'check_same_thread': False  # Allow multi-threaded access
    },
    'pool_pre_ping': True,  # Verify connections before using them
    'pool_recycle': 3600,  # Recycle connections after 1 hour
}

db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    instructor = db.Column(db.String(120), nullable=False)
    duration = db.Column(db.String(50))
    rating = db.Column(db.String(10), default="5.0")
    students = db.Column(db.String(20), default="0")
    image = db.Column(db.String(500))
    tags = db.Column(db.Text)  # Stored as JSON string
    video_url = db.Column(db.String(500))

class FacultyMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(120))
    bio = db.Column(db.Text)

class StudentRegistry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    course = db.Column(db.String(200))
    progress = db.Column(db.String(20))

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.String(50))
    is_read = db.Column(db.Boolean, default=False)

# Initialize Database and Seed Data
def init_db():
    with app.app_context():
        db.create_all()
        
        # Seed Users if table is empty
        if not User.query.first():
            users_data = [
                {"email": "admin@example.com", "password": "password123", "name": "Admin User", "role": "admin"},
                {"email": "faculty@example.com", "password": "password123", "name": "Dr. Alan Turing", "role": "faculty"},
                {"email": "student@example.com", "password": "password123", "name": "John Doe", "role": "student"}
            ]
            for u in users_data:
                db.session.add(User(**u))
        
        # Seed Faculty if table is empty
        if not FacultyMember.query.first():
            faculty_data = [
                { "name": "Dr. Alan Turing", "role": "AI & ML Expert", "bio": "Pioneer in computer science and artificial intelligence." },
                { "name": "Jane Doe", "role": "Senior System Architect", "bio": "15+ years experience designing scalable distributed systems." },
                { "name": "Sarah Smith", "role": "Frontend Specialist", "bio": "Expert in modern UI/UX and React ecosystems." },
                { "name": "Mike Wilson", "role": "Cybersecurity Expert", "bio": "Specialized in ethical hacking and network security with over a decade of experience." },
                { "name": "David Zhang", "role": "Cloud Architect", "bio": "Expert in AWS and Azure infrastructure, focusing on high availability and cost optimization." },
                { "name": "Robert Brown", "role": "Senior Cybersecurity Consultant", "bio": "Expert in cryptography and risk management." },
                { "name": "Emma Wilson", "role": "UX/UI Designer", "bio": "Passionate about creating accessible and inclusive digital experiences." },
                { "name": "Alice Liu", "role": "Data Scientist", "bio": "PhD in Statistics with a focus on deep learning." },
                { "name": "James Miller", "role": "Full Stack Developer", "bio": "Specializes in React, Node.js, and MongoDB." },
                { "name": "Sophia Garcia", "role": "Cloud Engineer", "bio": "Certified AWS Solution Architect." },
                { "name": "Liam Johnson", "role": "Java Developer", "bio": "Expert in Spring Boot and microservices architecture." },
                { "name": "Noah Williams", "role": "DevOps Engineer", "bio": "Focused on automation and CI/CD pipelines." },
                { "name": "Isabella Martinez", "role": "Mobile Developer", "bio": "Expert in Flutter and React Native." },
                { "name": "Lucas Davis", "role": "Project Manager", "bio": "Experience managing large-scale software projects." },
                { "name": "Mia Garcia", "role": "AI Researcher", "bio": "Published researcher in the field of Natural Language Processing." }
            ]
            for f in faculty_data:
                db.session.add(FacultyMember(**f))

        # Seed Courses if table is empty
        if not Course.query.first():
            courses_seed = [
                {
                    "title": "Advanced System Design",
                    "instructor": "Jane Doe",
                    "duration": "8 weeks",
                    "rating": "4.9",
                    "students": "1.2k",
                    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Architecture", "Backend"]),
                    "video_url": "https://www.youtube.com/watch?v=i53Gi_K397I"
                },
                {
                    "title": "React Native Mastery",
                    "instructor": "John Smith",
                    "duration": "6 weeks",
                    "rating": "4.8",
                    "students": "850",
                    "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Mobile", "Frontend"]),
                    "video_url": "https://www.youtube.com/watch?v=0-S5a0eXPoc"
                },
                {
                    "title": "AI & Machine Learning",
                    "instructor": "Dr. Alan Turing",
                    "duration": "12 weeks",
                    "rating": "5.0",
                    "students": "2.5k",
                    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["AI", "Python"]),
                    "video_url": "https://www.youtube.com/watch?v=GwIo3gDZCVQ"
                },
                {
                    "title": "Cloud Computing with AWS",
                    "instructor": "Sophia Garcia",
                    "duration": "10 weeks",
                    "rating": "4.9",
                    "students": "1.8k",
                    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Cloud", "AWS"]),
                    "video_url": "https://www.youtube.com/watch?v=ulprqHHWlng"
                },
                {
                    "title": "DevOps & CI/CD Pipelines",
                    "instructor": "Noah Williams",
                    "duration": "7 weeks",
                    "rating": "4.7",
                    "students": "920",
                    "image": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["DevOps", "CI/CD"]),
                    "video_url": "https://www.youtube.com/watch?v=scEDHsr3APg"
                },
                {
                    "title": "Cybersecurity Fundamentals",
                    "instructor": "Mike Wilson",
                    "duration": "9 weeks",
                    "rating": "4.8",
                    "students": "1.5k",
                    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Security", "Ethical Hacking"]),
                    "video_url": "https://www.youtube.com/watch?v=inWWhr5tnEA"
                },
                {
                    "title": "Data Science with Python",
                    "instructor": "Alice Liu",
                    "duration": "11 weeks",
                    "rating": "4.9",
                    "students": "2.1k",
                    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Data Science", "Python"]),
                    "video_url": "https://www.youtube.com/watch?v=ua-CiDNNj30"
                },
                {
                    "title": "Full Stack Web Development",
                    "instructor": "James Miller",
                    "duration": "14 weeks",
                    "rating": "4.8",
                    "students": "3.2k",
                    "image": "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Full Stack", "Web Development"]),
                    "video_url": "https://www.youtube.com/watch?v=nu_pCVPKzTk"
                },
                {
                    "title": "Kubernetes & Container Orchestration",
                    "instructor": "David Zhang",
                    "duration": "8 weeks",
                    "rating": "4.9",
                    "students": "1.1k",
                    "image": "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Kubernetes", "DevOps"]),
                    "video_url": "https://www.youtube.com/watch?v=X48VuDVv0do"
                },
                {
                    "title": "Blockchain Development",
                    "instructor": "Robert Brown",
                    "duration": "10 weeks",
                    "rating": "4.7",
                    "students": "780",
                    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Blockchain", "Web3"]),
                    "video_url": "https://www.youtube.com/watch?v=gyMwXuJrbJQ"
                },
                {
                    "title": "UI/UX Design Principles",
                    "instructor": "Emma Wilson",
                    "duration": "6 weeks",
                    "rating": "4.8",
                    "students": "1.4k",
                    "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Design", "UI/UX"]),
                    "video_url": "https://www.youtube.com/watch?v=c9Wg6Cb_YlU"
                },
                {
                    "title": "Mobile App Development with Flutter",
                    "instructor": "Isabella Martinez",
                    "duration": "9 weeks",
                    "rating": "4.9",
                    "students": "1.6k",
                    "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Flutter", "Mobile"]),
                    "video_url": "https://www.youtube.com/watch?v=1ukSR1GRtMU"
                },
                {
                    "title": "Database Design & Optimization",
                    "instructor": "Liam Johnson",
                    "duration": "7 weeks",
                    "rating": "4.8",
                    "students": "950",
                    "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600",
                    "tags": json.dumps(["Database", "SQL"]),
                    "video_url": "https://www.youtube.com/watch?v=ztHopE5Wnpc"
                }
            ]
            for c in courses_seed:
                db.session.add(Course(**c))

        # Seed Students if table is empty
        if not StudentRegistry.query.first():
            students_seed = [
                { "name": "Alice Johnson", "email": "alice@example.com", "course": "Advanced System Design", "progress": "85%" },
                { "name": "Bob Smith", "email": "bob@example.com", "course": "React Native Mastery", "progress": "60%" },
                { "name": "Charlie Brown", "email": "charlie@example.com", "course": "AI & Machine Learning", "progress": "92%" },
                { "name": "David Wilson", "email": "david@example.com", "course": "Advanced System Design", "progress": "45%" }
            ]
            for s in students_seed:
                db.session.add(StudentRegistry(**s))

        db.session.commit()

@app.route("/")
def home():
    return "Backend is running with SQLite 🚀"

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    required_role = data.get("required_role")

    user = User.query.filter_by(email=email, password=password).first()

    if user:
        if required_role and user.role != required_role:
            return jsonify({"message": f"Unauthorized. This portal is for {required_role}s only."}), 403
            
        return jsonify({
            "message": "Login successful",
            "user": {
                "name": user.name,
                "email": user.email,
                "role": user.role
            },
            "token": "mock-jwt-token"
        }), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email", "").lower()
    password = data.get("password")
    
    if ".faculty@" in email:
        role = "faculty"
    else:
        role = "student"

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    new_user = User(name=name, email=email, password=password, role=role)
    db.session.add(new_user)
    
    # Automatically add students to the Students Registry
    if role == "student":
        new_student = StudentRegistry(
            name=name,
            email=email,
            course="Not Enrolled",
            progress="0%"
        )
        db.session.add(new_student)
    
    # Automatically add faculty to the Faculty Management
    if role == "faculty":
        faculty_role = data.get("facultyRole", "Faculty Member")
        faculty_bio = data.get("bio", "")
        
        new_faculty = FacultyMember(
            name=name,
            role=faculty_role,
            bio=faculty_bio
        )
        db.session.add(new_faculty)
    
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "name": name,
            "email": email,
            "role": role
        },
        "token": "mock-jwt-token"
    }), 201

@app.route("/api/courses", methods=["GET"])
def get_courses():
    courses_list = Course.query.all()
    output = []
    for c in courses_list:
        output.append({
            "id": c.id,
            "title": c.title,
            "instructor": c.instructor,
            "duration": c.duration,
            "rating": c.rating,
            "students": c.students,
            "image": c.image,
            "tags": json.loads(c.tags) if c.tags else [],
            "video_url": c.video_url
        })
    return jsonify(output)

@app.route("/api/courses/<int:course_id>", methods=["GET"])
def get_course(course_id):
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"message": "Course not found"}), 404
    
    return jsonify({
        "id": course.id,
        "title": course.title,
        "instructor": course.instructor,
        "duration": course.duration,
        "rating": course.rating,
        "students": course.students,
        "image": course.image,
        "tags": json.loads(course.tags) if course.tags else [],
        "video_url": course.video_url
    })

@app.route("/api/courses", methods=["POST"])
def add_course():
    data = request.json
    new_course = Course(
        title=data.get("title"),
        instructor=data.get("instructor"),
        duration=data.get("duration"),
        rating="5.0",
        students="0",
        image=data.get("image", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"),
        tags=json.dumps(data.get("tags", [])),
        video_url=data.get("video_url")
    )
    db.session.add(new_course)
    db.session.commit()
    
    return jsonify({
        "message": "Course added successfully",
        "course": {
            "id": new_course.id,
            "title": new_course.title
        }
    }), 201

@app.route("/api/courses/<int:course_id>", methods=["DELETE"])
def delete_course(course_id):
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"message": "Course not found"}), 404
    
    db.session.delete(course)
    db.session.commit()
    return jsonify({"message": "Course deleted successfully"}), 200

@app.route("/api/faculty", methods=["GET"])
def get_faculty():
    faculty_list = FacultyMember.query.all()
    output = []
    for f in faculty_list:
        output.append({
            "id": f.id,
            "name": f.name,
            "role": f.role,
            "bio": f.bio
        })
    return jsonify(output)

@app.route("/api/faculty/<int:faculty_id>", methods=["PUT"])
def update_faculty(faculty_id):
    faculty = FacultyMember.query.get(faculty_id)
    if not faculty:
        return jsonify({"message": "Faculty not found"}), 404
        
    data = request.json
    faculty.name = data.get("name", faculty.name)
    faculty.role = data.get("role", faculty.role)
    faculty.bio = data.get("bio", faculty.bio)
    
    db.session.commit()
    return jsonify({"message": "Faculty updated successfully"}), 200

@app.route("/api/faculty/<int:faculty_id>", methods=["DELETE"])
def delete_faculty(faculty_id):
    faculty = FacultyMember.query.get(faculty_id)
    if not faculty:
        return jsonify({"message": "Faculty not found"}), 404
        
    db.session.delete(faculty)
    db.session.commit()
    return jsonify({"message": "Faculty deleted successfully"}), 200

@app.route("/api/faculty/analytics", methods=["GET"])
def get_faculty_analytics():
    # Simple mock analytics based on DB content
    total_stu = 0
    courses_list = Course.query.all()
    for c in courses_list:
        stu_str = c.students.replace('k', '000')
        try:
            total_stu += int(float(stu_str))
        except:
            pass
            
    # Mock peer ratings
    peer_ratings = [
        { "name": "Dr. Alan Turing", "rating": 5.0 },
        { "name": "Jane Doe", "rating": 4.9 },
        { "name": "Sarah Smith", "rating": 4.7 }
    ]
    
    return jsonify({
        "weekly_ranking": 3,
        "total_students": total_stu,
        "peer_ratings": peer_ratings
    })

@app.route("/api/students", methods=["GET"])
def get_students():
    students_list = StudentRegistry.query.all()
    output = []
    for s in students_list:
        output.append({
            "id": s.id,
            "name": s.name,
            "email": s.email,
            "course": s.course,
            "progress": s.progress
        })
    return jsonify(output)

@app.route("/api/students/<int:student_id>", methods=["PUT"])
def update_student(student_id):
    student = StudentRegistry.query.get(student_id)
    if not student:
        return jsonify({"message": "Student not found"}), 404
        
    data = request.json
    student.name = data.get("name", student.name)
    student.email = data.get("email", student.email)
    student.course = data.get("course", student.course)
    student.progress = data.get("progress", student.progress)
    
    db.session.commit()
    return jsonify({"message": "Student updated successfully"}), 200

@app.route("/api/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
    student = StudentRegistry.query.get(student_id)
    if not student:
        return jsonify({"message": "Student not found"}), 404
        
    db.session.delete(student)
    db.session.commit()
    return jsonify({"message": "Student deleted successfully"}), 200

@app.route("/api/enroll", methods=["POST"])
def enroll_student():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    course_title = data.get("course_title")

    if not name or not email or not course_title:
        return jsonify({"message": "Missing required fields"}), 400

    # Check if already enrolled
    existing_enrollment = StudentRegistry.query.filter_by(email=email, course=course_title).first()
    if existing_enrollment:
        return jsonify({"message": "You are already enrolled in this course"}), 400

    new_enrollment = StudentRegistry(
        name=name,
        email=email,
        course=course_title,
        progress="0%"
    )
    db.session.add(new_enrollment)
    db.session.commit()

    return jsonify({"message": f"Successfully enrolled in {course_title}"}), 201

@app.route("/api/contact", methods=["POST"])
def submit_contact():
    from datetime import datetime
    
    data = request.json
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    
    if not name or not email or not message:
        return jsonify({"message": "All fields are required"}), 400
    
    # Save message to database
    new_message = ContactMessage(
        name=name,
        email=email,
        message=message,
        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        is_read=False
    )
    db.session.add(new_message)
    db.session.commit()
    
    
    # Send email notification
    try:
        # Email Configuration
        SENDER_EMAIL = "gokuldeepamoorthy0712@gmail.com"
        SENDER_PASSWORD = "cvlqwlsgpgfqojhu"  # Note: This likely needs to be an App Password
        RECEIVER_EMAIL = "gokuldeepamoorthy0712@gmail.com"

        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f"New Contact Form Submission from {name}"

        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        msg.attach(MIMEText(body, 'plain'))

        # Send email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        text = msg.as_string()
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, text)
        server.quit()
        
        print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")
        # We don't return 500 here because the message was saved to DB successfully
    
    return jsonify({"message": "Message sent successfully! We'll get back to you soon."}), 201

@app.route("/api/contact-messages", methods=["GET"])
def get_contact_messages():
    messages = ContactMessage.query.order_by(ContactMessage.id.desc()).all()
    output = []
    for msg in messages:
        output.append({
            "id": msg.id,
            "name": msg.name,
            "email": msg.email,
            "message": msg.message,
            "timestamp": msg.timestamp,
            "is_read": msg.is_read
        })
    return jsonify(output)

if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
