import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '95%',
            zIndex: 1000,
            padding: '0.75rem 3rem',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--primary)' }}>
                    IndustryPortal
                </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/" className="nav-link" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Home</Link>
                <Link to="/about" className="nav-link" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>About Us</Link>
                <Link to="/contact" className="nav-link" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Contact Us</Link>

                {/* User Dropdown */}
                {user && (
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <button className="nav-link" style={{
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            More
                            <ChevronDown size={14} />
                        </button>

                        {dropdownOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                paddingTop: '1.5rem', // Invisible bridge
                                minWidth: '200px',
                            }}>
                                <div className="glass-panel dropdown-container" style={{
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                                }}>
                                    <Link to="/profile" className="dropdown-item">User Profile</Link>
                                    <Link to="/faculty" className="dropdown-item">Faculty Details</Link>
                                    <Link to="/courses" className="dropdown-item">Courses Available</Link>
                                    <Link to="/dashboard" className="dropdown-item">My Progress</Link>
                                    {user.role === 'faculty' && (
                                        <Link to="/add-course" className="dropdown-item">Add Course</Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                                {user.name.charAt(0)}
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="nav-link"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontWeight: 500 }}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                            Login
                        </Link>
                        <Link to="/signup" className="nav-link" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Sign Up
                        </Link>
                    </div>
                )}


            </div>

            {/* Mobile Toggle */}
            <button
                className="mobile-toggle"
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: 'var(--text-primary)', padding: '0.5rem' }}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="mobile-menu glass-panel" style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    width: '100%',
                    marginTop: '1rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    borderRadius: 'var(--radius-lg)'
                }}>
                    <Link to="/" onClick={() => setIsOpen(false)} style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Home</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>About Us</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Contact Us</Link>
                    {user && (
                        <>
                            <div style={{ height: '1px', background: 'var(--border-subtle)' }} />
                            <Link to="/profile" onClick={() => setIsOpen(false)} style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>User Profile</Link>
                            <Link to="/faculty" onClick={() => setIsOpen(false)} style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Faculty Details</Link>
                            <Link to="/courses" onClick={() => setIsOpen(false)} style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Courses Available</Link>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>My Progress</Link>
                            {user.role === 'faculty' && (
                                <Link to="/add-course" onClick={() => setIsOpen(false)} style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Add Course</Link>
                            )}
                        </>
                    )}

                    {user ? (
                        <button
                            onClick={() => { handleLogout(); setIsOpen(false); }}
                            className="btn"
                            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                        >
                            Logout
                        </button>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ textAlign: 'center' }}>
                                Login
                            </Link>
                            <Link to="/signup" onClick={() => setIsOpen(false)} style={{ textAlign: 'center', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                Sign Up
                            </Link>
                        </div>
                    )}


                </div>
            )}

            <style>{`
                .mobile-toggle { display: none; }
                .mobile-menu { display: none; }
                .dropdown-item {
                    display: block;
                    padding: 0.5rem 1rem;
                    border-radius: var(--radius-md);
                    color: var(--text-secondary);
                    transition: all var(--transition-fast);
                    white-space: nowrap;
                }
                .dropdown-item:hover {
                    color: #000000;
                    background: rgba(0, 0, 0, 0.05);
                }

                @media (max-width: 768px) {
                  .desktop-nav { display: none !important; }
                  .mobile-toggle { display: block; }
                  .mobile-menu { display: flex; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;

