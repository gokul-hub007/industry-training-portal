import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '4rem 0 2rem',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            zIndex: 1
        }}>
            <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>IndustryPortal</h3>
                <p style={{ marginBottom: '2rem', maxWidth: '600px', marginInline: 'auto' }}>
                    Empowering the next generation of professionals with industry-leading skills and certifications.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <a href="#" className="social-icon" aria-label="Instagram">
                        <Instagram size={24} />
                    </a>
                    <a href="#" className="social-icon" aria-label="Twitter">
                        <Twitter size={24} />
                    </a>
                    <a href="#" className="social-icon" aria-label="LinkedIn">
                        <Linkedin size={24} />
                    </a>
                    <a href="#" className="social-icon" aria-label="GitHub">
                        <Github size={24} />
                    </a>
                </div>

                <p>&copy; 2024 Industry Training Portal. All rights reserved.</p>
            </div>

            <style>{`
        .social-icon {
            color: var(--text-secondary);
            transition: color var(--transition-fast), transform var(--transition-fast);
        }
        .social-icon:hover {
            color: var(--text-accent);
            transform: translateY(-2px);
        }
      `}</style>
        </footer>
    );
};

export default Footer;
