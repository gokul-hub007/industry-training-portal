import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Clock, Star, Users, CheckCircle, PlayCircle, Award, Loader2 } from 'lucide-react';
import { fetchCourseById, enrollCourse, fetchStudentsRegistry } from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getCourse = async () => {
            setLoading(true);
            const data = await fetchCourseById(id);
            setCourse(data);
            setLoading(false);
        };
        getCourse();
    }, [id]);

    useEffect(() => {
        const checkEnrollment = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && course) {
                try {
                    const students = await fetchStudentsRegistry();
                    const enrolled = students.some(s => s.email === user.email && s.course === course.title);
                    if (enrolled) setIsEnrolled(true);
                } catch (error) {
                    console.error("Failed to check enrollment", error);
                }
            }
        };
        checkEnrollment();
    }, [course]);

    const handleEnroll = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }

        console.log('Attempting to enroll:', {
            userName: user.name,
            userEmail: user.email,
            courseTitle: course.title
        });

        setEnrolling(true);
        try {
            const result = await enrollCourse({
                name: user.name,
                email: user.email,
                course_title: course.title
            });
            console.log('Enrollment successful:', result);
            alert('Successfully enrolled!');
            setIsEnrolled(true);
        } catch (error) {
            console.error('Enrollment error:', error);
            alert('Error: ' + (error.message || 'Failed to enroll. Please try again.'));
        } finally {
            setEnrolling(false);
        }
    };

    // Mock curriculum and features - in a real app, these would come from the backend
    const curriculum = [
        "Introduction to Core Concepts",
        "Advanced Techniques & Best Practices",
        "Real-world Applications",
        "Hands-on Projects",
        "Industry Case Studies",
        "Final Assessment & Certification"
    ];

    const features = [
        "20+ hours of video content",
        "Real-world case studies",
        "Certificate of completion",
        "Lifetime access"
    ];

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
                <h1>Course not found</h1>
                <Link to="/courses" style={{ color: 'var(--primary)' }}>← Back to Courses</Link>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))',
                padding: '8rem 0 4rem',
                borderBottom: '1px solid var(--border-subtle)'
            }}>
                <div className="container">
                    <Link to="/courses" style={{ color: 'var(--text-secondary)', marginBottom: '1rem', display: 'inline-block' }}>&larr; Back to Courses</Link>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{course.title}</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '2rem' }}>
                        Master the skills you need to excel in {course.title.toLowerCase()} with industry-leading instruction and hands-on projects.
                    </p>

                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Star color="var(--warning)" fill="var(--warning)" size={20} />
                            <span style={{ fontWeight: 600 }}>{course.rating}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={20} />
                            <span>{course.students} Enrolled</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={20} />
                            <span>{course.duration}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Award size={20} />
                            <span>By {course.instructor}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button
                            variant="primary"
                            onClick={handleEnroll}
                            disabled={enrolling || isEnrolled}
                            style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1.1rem',
                                opacity: isEnrolled ? 0.7 : 1,
                                cursor: isEnrolled ? 'default' : 'pointer'
                            }}
                        >
                            {enrolling ? 'Enrolling...' : isEnrolled ? 'Enrolled' : 'Enroll Now'}
                        </Button>
                        {course.video_url && (
                            <a href={course.video_url} target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" style={{ padding: '1rem 2rem' }}>Watch Preview</Button>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '4rem 0', display: 'flex', gap: '4rem', flexDirection: 'row', flexWrap: 'wrap' }}>
                {/* Main Content */}
                <div style={{ flex: 2, minWidth: '300px' }}>
                    <h2 style={{ marginBottom: '2rem' }}>What you'll learn</h2>
                    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
                        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', listStyle: 'none' }}>
                            {curriculum.map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <CheckCircle size={20} color="var(--success)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <h2 style={{ marginBottom: '2rem' }}>Course Content</h2>
                    <div className="glass-panel" style={{ overflow: 'hidden' }}>
                        {curriculum.map((module, i) => (
                            <div key={i} style={{
                                padding: '1.25rem 2rem',
                                borderBottom: i !== curriculum.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer'
                            }} className="module-item">
                                <PlayCircle size={20} color="var(--primary)" />
                                <span style={{ fontWeight: 500 }}>Module {i + 1}: {module}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '7rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>This course includes:</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {features.map((feature, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <Award size={18} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseDetails;
