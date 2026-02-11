import React, { useState } from 'react';
import Button from './Button';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/apiClient';
import { AlertCircle, Loader2 } from 'lucide-react';

const LoginForm = ({ role }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isStudent = role === 'student';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await login(email, password, role);
            // Store user info and token
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);

            // Redirect to dashboard
            navigate('/dashboard');
            window.location.reload(); // Force reload to update navbar
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        borderTop: `4px solid ${isStudent ? '#3b82f6' : '#8b5cf6'}` // Blue for student, Violet for faculty
    };

    return (
        <div className="glass-panel" style={containerStyle}>
            <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
                {isStudent ? 'Student Login' : 'Faculty Portal'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
                {isStudent
                    ? 'Access your learning dashboard and courses.'
                    : 'Manage your courses and student applications.'}
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

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                <Button
                    type="submit"
                    disabled={loading}
                    variant={isStudent ? 'primary' : 'secondary'}
                    style={{
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: isStudent ? '#3b82f6' : '#8b5cf6'
                    }}
                >
                    {loading && <Loader2 size={18} className="animate-spin" />}
                    {loading ? 'Authenticating...' : 'Sign In'}
                </Button>
            </form>

            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {isStudent ? (
                    <>Don't have an account? <Link to="/signup" style={{ color: 'var(--text-accent)' }}>Sign up</Link></>
                ) : (
                    <>Need faculty access? <Link to="/contact" style={{ color: '#8b5cf6' }}>Contact Administration</Link></>
                )}
            </p>
        </div>
    );
};

export default LoginForm;
