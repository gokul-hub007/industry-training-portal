import Button from '../components/Button';
import CourseCard from '../components/CourseCard';
import ParticlesBackground from '../components/ParticlesBackground';
import { Shield, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const Home = () => {
    useScrollReveal();

    return (
        <>
            {/* Hero Section */}
            <section style={{
                padding: '20rem 0 8rem',
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <ParticlesBackground />
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ maxWidth: '800px' }}>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                            marginBottom: '1.5rem',
                            lineHeight: 1.1,
                            animation: 'floatText 3s ease-in-out infinite'
                        }}>
                            Master the Skills of <br />
                            <span className="text-gradient">Tomorrow, Today.</span>
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '2.5rem',
                            maxWidth: '600px'
                        }}>
                            Join the world's most premium industry training platform.
                            Expert-led courses, immersive learning, and certified success.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/courses">
                                <Button variant="primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Explore Courses</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Start Free Trial</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
                    opacity: 0.4,
                    filter: 'blur(80px)',
                    zIndex: 0
                }} />
            </section>

            {/* Features Section */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        <div className="glass-panel hover-zoom reveal" style={{ padding: '2rem' }}>
                            <div style={{ marginBottom: '1.5rem', color: '#000000' }}><Zap size={40} /></div>
                            <h3 style={{ marginBottom: '1rem' }}>Fast-Track Learning</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Curriculum designed to get you job-ready in record time with practical, hands-on projects.</p>
                        </div>
                        <div className="glass-panel hover-zoom reveal" style={{ padding: '2rem', transitionDelay: '0.2s' }}>
                            <div style={{ marginBottom: '1.5rem', color: '#000000' }}><Shield size={40} /></div>
                            <h3 style={{ marginBottom: '1rem' }}>Industry Verified</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Courses vetted by top industry experts to ensure you learn what matters most.</p>
                        </div>
                        <div className="glass-panel hover-zoom reveal" style={{ padding: '2rem', transitionDelay: '0.4s' }}>
                            <div style={{ marginBottom: '1.5rem', color: '#000000' }}><Award size={40} /></div>
                            <h3 style={{ marginBottom: '1rem' }}>Certified Excellence</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Earn badges and certificates recognized by global employers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Overview Section */}
            <section style={{ padding: '6rem 0', position: 'relative' }}>
                <div className="container">
                    <div className="glass-panel reveal" style={{
                        padding: '4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,249,250,0.8) 100%)'
                    }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Who We Are</h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)',
                            maxWidth: '800px',
                            lineHeight: '1.8',
                            marginBottom: '3rem'
                        }}>
                            IndustryPortal is a premier destination for high-impact professional training.
                            Founded on the principle of bridging the gap between education and employment,
                            we empower thousands of individuals every year with skills that matter in the real world.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '3rem',
                            width: '100%'
                        }}>
                            <div>
                                <h4 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>5+</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Years of Excellence</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>500+</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Industry Experts</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>50k+</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Alumni Network</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses Preview */}
            <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid #efefef' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Trending Courses</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Most popular among professionals this week.</p>
                        </div>
                        <Link to="/courses" style={{
                            color: 'var(--primary)',
                            fontWeight: 600,
                            transition: 'all 0.3s ease'
                        }} className="view-all-link">View All &rarr;</Link>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        <div className="reveal">
                            <CourseCard
                                title="Advanced System Design"
                                instructor="Jane Doe"
                                duration="8 weeks"
                                rating="4.9"
                                students="1.2k"
                                image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"
                                tags={['Architecture', 'Backend']}
                            />
                        </div>
                        <div className="reveal" style={{ transitionDelay: '0.2s' }}>
                            <CourseCard
                                title="React Native Mastery"
                                instructor="John Smith"
                                duration="6 weeks"
                                rating="4.8"
                                students="850"
                                image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"
                                tags={['Mobile', 'Frontend']}
                            />
                        </div>
                        <div className="reveal" style={{ transitionDelay: '0.4s' }}>
                            <CourseCard
                                title="AI & Machine Learning"
                                instructor="Dr. Alan Turing"
                                duration="12 weeks"
                                rating="5.0"
                                students="2.5k"
                                image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600"
                                tags={['AI', 'Python']}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
                .view-all-link:hover {
                    text-shadow: 0 0 15px rgba(0,0,0,0.2), 0 0 5px rgba(0,0,0,0.1);
                    transform: translateX(5px);
                }
            `}</style>
        </>
    );
};

export default Home;
