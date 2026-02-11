from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

courses = []
contact_messages = []

# Email Configuration
# WARNING: Replace these with real credentials and use Environment Variables in production!
SENDER_EMAIL = "gokuldeepamoorthy0712@gmail.com" 
SENDER_PASSWORD = "cvlq wlsg pgfq ojhu" 

@app.route("/", methods=["GET"])
def home():
    return "Backend is running 🚀"

@app.route("/api/courses", methods=["GET"])
def get_courses():
    return jsonify(courses)

@app.route("/api/courses", methods=["POST"])
def add_course():
    data = request.json

    course = {
        "id": len(courses) + 1,
        "title": data.get("title"),
        "duration": data.get("duration"),
        "faculty": data.get("faculty")
    }

    courses.append(course)

    return jsonify({
        "message": "Course added successfully",
        "course": course
    }), 201

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    # Store message locally (optional)
    contact_messages.append(data)
    print(f"Received message from {name} ({email}): {message}")

    try:
        # Create email
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = "gokuldeepamoorthy0712@gmail.com"
        msg['Subject'] = f"New Contact Form Submission from {name}"

        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        msg.attach(MIMEText(body, 'plain'))

        # Send email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        text = msg.as_string()
        server.sendmail(SENDER_EMAIL, "gokuldeepamoorthy0712@gmail.com", text)
        server.quit()
        
        print("Email sent successfully")
        return jsonify({"message": "Message sent successfully!"}), 200

    except Exception as e:
        print(f"Failed to send email: {e}")
        # Even if email fails, we might want to return success if we stored it, 
        # but for now let's return error to debug
        return jsonify({"message": f"Failed to send email: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
