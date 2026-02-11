import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../api/apiClient';
import Button from '../components/Button';
import { Plus, X, Image as ImageIcon, Video, Tag, Clock, User } from 'lucide-react';

const AddCourse = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        instructor: '',
        duration: '',
        image: '',
        video_url: '',
        tags: []
    });
    const [currentTag, setCurrentTag] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.instructor.trim()) newErrors.instructor = 'Instructor name is required';
        if (!formData.duration.trim()) newErrors.duration = 'Duration is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await addCourse(formData);
            alert('Course added successfully!');
            navigate('/courses');
        } catch (error) {
            alert('Failed to add course: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))',
            minHeight: '100vh',
            paddingTop: '8rem',
            paddingBottom: '4rem'
        }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Add New Course</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Create a new course to share your expertise with students
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
                    {/* Title */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                        }}>
                            <Tag size={18} />
                            Course Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Advanced System Design"
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                border: errors.title ? '2px solid #ef4444' : '1px solid var(--border-subtle)',
                                background: 'var(--bg-primary)',
                                fontSize: '1rem',
                                transition: 'all var(--transition-fast)'
                            }}
                        />
                        {errors.title && (
                            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Instructor */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                        }}>
                            <User size={18} />
                            Instructor Name *
                        </label>
                        <input
                            type="text"
                            name="instructor"
                            value={formData.instructor}
                            onChange={handleInputChange}
                            placeholder="e.g., Dr. Jane Doe"
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                border: errors.instructor ? '2px solid #ef4444' : '1px solid var(--border-subtle)',
                                background: 'var(--bg-primary)',
                                fontSize: '1rem',
                                transition: 'all var(--transition-fast)'
                            }}
                        />
                        {errors.instructor && (
                            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                {errors.instructor}
                            </p>
                        )}
                    </div>

                    {/* Duration */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                        }}>
                            <Clock size={18} />
                            Duration *
                        </label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            placeholder="e.g., 8 weeks"
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                border: errors.duration ? '2px solid #ef4444' : '1px solid var(--border-subtle)',
                                background: 'var(--bg-primary)',
                                fontSize: '1rem',
                                transition: 'all var(--transition-fast)'
                            }}
                        />
                        {errors.duration && (
                            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                {errors.duration}
                            </p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                        }}>
                            <ImageIcon size={18} />
                            Course Image URL
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg (optional)"
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-subtle)',
                                background: 'var(--bg-primary)',
                                fontSize: '1rem',
                                transition: 'all var(--transition-fast)'
                            }}
                        />
                        {formData.image && (
                            <div style={{ marginTop: '1rem', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Video URL */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                        }}>
                            <Video size={18} />
                            Preview Video URL
                        </label>
                        <input
                            type="text"
                            name="video_url"
                            value={formData.video_url}
                            onChange={handleInputChange}
                            placeholder="https://youtube.com/watch?v=... (optional)"
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-subtle)',
                                background: 'var(--bg-primary)',
                                fontSize: '1rem',
                                transition: 'all var(--transition-fast)'
                            }}
                        />
                    </div>

                    {/* Tags */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                        }}>
                            <Tag size={18} />
                            Course Tags
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <input
                                type="text"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                placeholder="Add a tag (e.g., Python, AI)"
                                style={{
                                    flex: 1,
                                    padding: '0.875rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-subtle)',
                                    background: 'var(--bg-primary)',
                                    fontSize: '1rem'
                                }}
                            />
                            <Button
                                type="button"
                                onClick={handleAddTag}
                                variant="secondary"
                                style={{ padding: '0.875rem 1.5rem' }}
                            >
                                <Plus size={18} />
                            </Button>
                        </div>
                        {formData.tags.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {formData.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'white',
                                                cursor: 'pointer',
                                                padding: 0,
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
                    </div>

                    {/* Submit Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/courses')}
                            style={{ padding: '0.875rem 2rem' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            style={{ padding: '0.875rem 2rem' }}
                        >
                            {loading ? 'Adding Course...' : 'Add Course'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourse;
