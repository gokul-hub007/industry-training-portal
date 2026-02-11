import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CourseCard from '../components/CourseCard';
import { User, Mail, MapPin, Briefcase, Camera } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user data from localStorage (set during signup/login)
        const storedUser = localStorage.getItem('user');
        const storedProfile = localStorage.getItem('userProfile');

        if (storedUser) {
            const userData = JSON.parse(storedUser);
            const profileData = storedProfile ? JSON.parse(storedProfile) : {};

            setUser({
                name: userData.name,
                role: userData.role === 'faculty' ? 'Faculty Member' : userData.role === 'admin' ? 'Admin' : 'Student',
                email: userData.email,
                location: profileData.location || "Not specified",
                bio: profileData.bio || `Welcome to IndustryPortal! I'm ${userData.name}, a ${userData.role === 'faculty' ? 'faculty member' : 'student'} passionate about learning and growing in the tech industry.`,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&size=200&background=6366f1&color=fff`,
                skills: profileData.skills || [],
                joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            });
        } else {
            // Fallback to mock data if no user is logged in
            setUser({
                name: "Guest User",
                role: "Visitor",
                email: "guest@example.com",
                location: "Not specified",
                bio: "Please log in to view your profile.",
                avatar: "https://ui-avatars.com/api/?name=Guest+User&size=200&background=6366f1&color=fff",
                skills: [],
                joined: "N/A"
            });
        }
    }, []);

    // Mock course data
    const ongoingCourses = [
        {
            title: "Advanced System Design",
            instructor: "Jane Doe",
            duration: "8 weeks",
            rating: "4.9",
            students: "1.2k",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
            tags: ['Architecture', 'Backend']
        }
    ];

    const completedCourses = [
        {
            title: "React Fundamentals",
            instructor: "Sarah Smith",
            duration: "4 weeks",
            rating: "4.8",
            students: "2.1k",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
            tags: ['Frontend', 'React']
        },
        {
            title: "Python for Beginners",
            instructor: "Mike Johnson",
            duration: "6 weeks",
            rating: "4.7",
            students: "3.5k",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
            tags: ['Python', 'Basics']
        }
    ];

    if (!user) {
        return null; // or a loading spinner
    }

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', overflow: 'hidden' }}>
                {/* Banner/Header */}
                <div style={{
                    height: '200px',
                    background: 'linear-gradient(to right, var(--primary), var(--accent))',
                    position: 'relative'
                }}>
                    {/* Avatar */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-50px',
                        left: '2rem',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: '4px solid var(--bg-card)',
                        overflow: 'hidden',
                        background: 'var(--bg-secondary)'
                    }}>
                        <img
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* Profile Content */}
                <div style={{ padding: '4rem 2rem 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ marginBottom: '0.25rem' }}>{user.name}</h1>
                            <p style={{ color: 'var(--text-accent)', fontWeight: 500 }}>{user.role}</p>
                        </div>
                        <Button variant="secondary" onClick={() => navigate('/edit-profile')}><Camera size={16} /> Edit Profile</Button>
                    </div>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {/* About Section */}
                        <div>
                            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>About</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                {user.bio}
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                <Mail size={20} color="var(--primary)" />
                                <span>{user.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                <MapPin size={20} color="var(--primary)" />
                                <span>{user.location}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                <Briefcase size={20} color="var(--primary)" />
                                <span>joined {user.joined}</span>
                            </div>
                        </div>

                        {/* Skills Section */}
                        {user.skills.length > 0 && (
                            <div>
                                <h3 style={{ marginBottom: '1rem' }}>Skills</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {user.skills.map((skill, index) => (
                                        <span key={index} style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.9rem',
                                            border: '1px solid var(--border-subtle)',
                                            color: 'var(--text-primary)'
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Ongoing Courses - Hide for Admin */}
                        {user.role !== 'Admin' && (
                            <div>
                                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Ongoing Courses</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {ongoingCourses.map((course, index) => (
                                        <CourseCard key={index} {...course} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Completed Courses - Hide for Admin */}
                        {user.role !== 'Admin' && (
                            <div>
                                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Completed Courses</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {completedCourses.map((course, index) => (
                                        <CourseCard key={index} {...course} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
