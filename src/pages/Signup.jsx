import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/apiClient';
import { AlertCircle, Loader2 } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        facultyRole: '',
        bio: '',
        location: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Detect if email is a faculty email
    const isFacultyEmail = formData.email.toLowerCase().includes('.faculty@');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate faculty role if faculty email
        if (isFacultyEmail && !formData.facultyRole.trim()) {
            setError('Please provide your role/specialization as a faculty member');
            return;
        }

        setLoading(true);

        try {
            const signupData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            // Add faculty-specific data if faculty email
            if (isFacultyEmail) {
                signupData.facultyRole = formData.facultyRole;
                signupData.bio = formData.bio;
            }

            const data = await signup(signupData);

            // Store user info and token
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);

            // Store profile data if provided
            if (formData.bio || formData.location) {
                const profileData = {
                    bio: formData.bio || '',
                    location: formData.location || '',
                    skills: []
                };
                localStorage.setItem('userProfile', JSON.stringify(profileData));
            }

            // Redirect to dashboard
            navigate('/dashboard');
            window.location.reload(); // Force reload to update navbar
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '6rem',
            paddingBottom: '4rem'
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
                <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
                    Join IndustryPortal and start your learning journey today.
                </p>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        color: '#ef4444',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem'
                    }}>
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            style={{
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border-subtle)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            style={{
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border-subtle)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '-0.25rem' }}>
                            Tip: Use an email with <strong>.faculty@</strong> to register as faculty.
                        </p>
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            style={{
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border-subtle)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            style={{
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border-subtle)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Faculty Role Field - Only shown for faculty emails */}
                    {isFacultyEmail && (
                        <div style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-sm)',
                            marginTop: '0.5rem'
                        }}>
                            <p style={{ fontSize: '0.85rem', color: '#60a5fa', marginBottom: '1rem', fontWeight: 500 }}>
                                ✨ Faculty email detected! Please provide your specialization.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                                    Role/Specialization *
                                </label>
                                <input
                                    type="text"
                                    name="facultyRole"
                                    required={isFacultyEmail}
                                    value={formData.facultyRole}
                                    onChange={handleChange}
                                    placeholder="e.g., AI & ML Expert, Cloud Architect, Full Stack Developer"
                                    style={{
                                        background: 'rgba(0,0,0,0.2)',
                                        border: '1px solid var(--border-subtle)',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Optional Profile Fields */}
                    <div style={{
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '1rem',
                        marginTop: '0.5rem'
                    }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>Optional:</strong> Add profile details now (you can also add these later)
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Tell us about yourself..."
                                    rows={3}
                                    style={{
                                        background: 'rgba(0,0,0,0.2)',
                                        border: '1px solid var(--border-subtle)',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'white',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g., San Francisco, CA"
                                    style={{
                                        background: 'rgba(0,0,0,0.2)',
                                        border: '1px solid var(--border-subtle)',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--text-accent)' }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
