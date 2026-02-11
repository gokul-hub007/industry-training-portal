import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Save, X, Plus } from 'lucide-react';

const EditProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bio: '',
        location: '',
        skills: []
    });
    const [newSkill, setNewSkill] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        // Load existing profile data from localStorage
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            const profileData = JSON.parse(storedProfile);
            setFormData({
                bio: profileData.bio || '',
                location: profileData.location || '',
                skills: profileData.skills || []
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, newSkill.trim()]
            });
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(skill => skill !== skillToRemove)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Save to localStorage (in a real app, this would be an API call)
            localStorage.setItem('userProfile', JSON.stringify(formData));

            setMessage({ type: 'success', text: 'Profile updated successfully!' });

            // Redirect to profile page after 1.5 seconds
            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem' }}>Edit Profile</h1>
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/profile')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <X size={18} /> Cancel
                    </Button>
                </div>

                {message.text && (
                    <div style={{
                        background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        color: message.type === 'success' ? '#22c55e' : '#ef4444',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem'
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Bio */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            rows={4}
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
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            Brief description for your profile. Maximum 500 characters.
                        </p>
                    </div>

                    {/* Location */}
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

                    {/* Skills */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Skills</label>

                        {/* Add Skill Input */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                placeholder="Add a skill..."
                                style={{
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--border-subtle)',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'white',
                                    outline: 'none',
                                    flex: 1
                                }}
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleAddSkill}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
                            >
                                <Plus size={16} /> Add
                            </Button>
                        </div>

                        {/* Skills List */}
                        {formData.skills.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
                                {formData.skills.map((skill, index) => (
                                    <span key={index} style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.9rem',
                                        border: '1px solid var(--border-subtle)',
                                        color: 'var(--text-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--text-secondary)',
                                                cursor: 'pointer',
                                                padding: '0',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            Add skills relevant to your profile. Press Enter or click Add.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <Button
                            type="submit"
                            disabled={loading}
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
