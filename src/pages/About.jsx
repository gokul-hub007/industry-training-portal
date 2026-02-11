import { Target, Flag, TrendingUp, Award, Users, Globe } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import Typewriter from '../components/Typewriter';

const About = () => {
    useScrollReveal();
    const milestones = [
        { year: "2020", title: "Inception", description: "Launched with a vision to bridge the gap between academia and industry." },
        { year: "2022", title: "10k+ Learners", description: "Reached a major milestone of empowering over 10,000 students globally." },
        { year: "2024", title: "Global Expansion", description: "Partnered with top 50 Fortune 500 companies for direct placements." }
    ];

    const leadership = [
        {
            name: "Dr. James Mitchell",
            role: "Founder",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
            bio: "Visionary leader with 20+ years in EdTech, committed to revolutionizing digital learning."
        },
        {
            name: "Robert Anderson",
            role: "Chairman",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
            bio: "Former CEO of TechGlobal, bringing strategic insight and industry connections."
        },
        {
            name: "Prof. Emily Carter",
            role: "Dean of Academics",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
            bio: "Distinguished academician focused on curriculum excellence and student success."
        }
    ];

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', color: 'var(--text-primary)' }}>
            {/* Hero / Slogan Section */}
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    color: 'var(--text-primary)',
                    animation: 'popUp 1.2s ease-out forwards'
                }}>
                    "Empowering the Future, One Skill at a Time."
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '700px',
                    margin: '0 auto',
                    opacity: 0,
                    animation: 'popUp 1.2s ease-out 0.8s forwards'
                }}>
                    We exist to transform ambitious individuals into industry-ready professionals through world-class training and mentorship.
                </p>
            </div>

            {/* Motive Section */}
            <section style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Our Motive</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem', color: 'var(--primary)', display: 'inline-block', padding: '1rem', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '50%' }}>
                            <Target size={32} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>Mission</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>To democratize access to high-quality, industry-relevant education for everyone, everywhere.</p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem', color: 'var(--accent)', display: 'inline-block', padding: '1rem', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '50%' }}>
                            <Flag size={32} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>Vision</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>To be the global standard for professional skill development and certification.</p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section style={{ marginBottom: '6rem' }}>
                <div className="glass-panel reveal" style={{
                    padding: '3rem',
                    animation: 'popUp 1.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
                }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Story</h2>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            <Typewriter
                                text="Founded in 2020, IndustryPortal began as a small initiative by a group of passionate educators and industry veterans who saw a growing gap between university curriculum and the evolving demands of the global workforce."
                                speed={45}
                                delay={2200}
                            />
                        </p>
                        <p>
                            <Typewriter
                                text="What started as a single certification program has grown into a world-class platform serving thousands of learners across 50+ countries. Our commitment remains the same: to provide accessible, high-quality, and practical training that actually gets you hired."
                                speed={45}
                                delay={11000}
                            />
                        </p>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>Meet Our Visionaries</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {leadership.map((leader, index) => (
                        <div key={index}
                            className="glass-panel hover-zoom reveal"
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                transitionDelay: `${index * 0.2}s`
                            }}>
                            <img
                                src={leader.image}
                                alt={leader.name}
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginBottom: '1.5rem',
                                    border: '3px solid var(--primary)',
                                    padding: '3px'
                                }}
                            />
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{leader.name}</h3>
                            <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>{leader.role}</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{leader.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Achievements Section */}
            <section style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>Our Global Impact</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem'
                }}>
                    {[
                        { label: 'Learners Empowered', value: '50,000+', icon: <Users size={32} /> },
                        { label: 'Placement Rate', value: '95%', icon: <Award size={32} /> },
                        { label: 'Global Partners', value: '100+', icon: <Globe size={32} /> },
                        { label: 'Salary Increase', value: '60%', icon: <TrendingUp size={32} /> }
                    ].map((stat, idx) => (
                        <div key={idx} className="glass-panel hover-zoom reveal" style={{
                            padding: '2.5rem',
                            textAlign: 'center',
                            transitionDelay: `${idx * 0.15}s`
                        }}>
                            <div style={{
                                color: 'var(--primary)',
                                marginBottom: '1rem',
                                display: 'inline-block',
                                transition: 'transform 0.3s ease'
                            }}>
                                {stat.icon}
                            </div>
                            <h3 style={{
                                fontSize: '2.5rem',
                                marginBottom: '0.5rem',
                                fontWeight: 800,
                                textShadow: '0 0 20px rgba(0,0,0,0.1)'
                            }} className="stat-value">{stat.value}</h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontSize: '0.8rem'
                            }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Milestones Section */}
            <section>
                <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>Our Journey & Milestones</h2>
                <div style={{ position: 'relative' }}>
                    {/* Timeline Line */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.1)',
                        zIndex: 0
                    }} className="timeline-line"></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', zIndex: 1 }}>
                        {milestones.map((milestone, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                                position: 'relative'
                            }}>
                                {/* Dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '16px',
                                    height: '16px',
                                    background: 'var(--primary)',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                                }}></div>

                                <div className="glass-panel hover-zoom reveal" style={{
                                    width: '45%',
                                    padding: '1.5rem',
                                    textAlign: index % 2 === 0 ? 'left' : 'right',
                                    transitionDelay: `${index * 0.2}s`
                                }}>
                                    <div style={{
                                        color: 'var(--primary)',
                                        fontWeight: 800,
                                        fontSize: '1.5rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {milestone.year}
                                    </div>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{milestone.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                @media (max-width: 768px) {
                    .timeline-line { left: 20px !important; }
                    .glass-panel { width: calc(100% - 50px) !important; margin-left: 50px !important; text-align: left !important; }
                }

                @keyframes popUp {
                    from { 
                        opacity: 0; 
                        transform: scale(0.85) translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1) translateY(0); 
                    }
                }

                .glass-panel:hover .stat-value {
                    color: #000;
                    text-shadow: 0 0 10px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1);
                    transform: scale(1.1);
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
};

export default About;
