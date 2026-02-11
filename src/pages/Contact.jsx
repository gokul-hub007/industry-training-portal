import { useState } from 'react';
import Button from '../components/Button';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                // Hide success message after 5 seconds
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError(data.message || 'Failed to send message. Please try again.');
            }
        } catch (err) {
            setError('Failed to send message. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', color: 'var(--text-primary)' }}>
            <h1 style={{ marginBottom: '2rem' }}>Contact Us</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                <div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Mail color="var(--primary)" />
                            <span>gokuldeepamoorthy0712@gmail.com</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Phone color="var(--primary)" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <MapPin color="var(--primary)" />
                            <span>123 Tech Street, Silicon Valley, CA</span>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    {success && (
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            color: '#22c55e',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            <CheckCircle size={18} />
                            Message sent successfully! We'll get back to you soon.
                        </div>
                    )}

                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            color: '#ef4444',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-lg)',
                                background: 'rgba(0,0,0,0.05)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-lg)',
                                background: 'rgba(0,0,0,0.05)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message"
                            rows="4"
                            required
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-lg)',
                                background: 'rgba(0,0,0,0.05)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                resize: 'vertical',
                                fontFamily: 'inherit'
                            }}
                        ></textarea>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
