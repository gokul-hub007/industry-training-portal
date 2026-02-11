import Button from './Button';
import { Clock, Star, Users, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ id, title, instructor, duration, rating, students, image, tags, video_url, showDelete, onDelete, isFaculty }) => {
    return (
        <div className="glass-panel hover-zoom" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                    src={image}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                    {tags.map((tag, i) => (
                        <span key={i} style={{
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'white'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {showDelete && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete();
                        }}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            background: 'rgba(239, 68, 68, 0.8)',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.5rem',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                        }}
                        title="Delete Course"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{instructor}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={14} color="#fbbf24" fill="#fbbf24" />
                        <span>{rating}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Users size={14} />
                        <span>{students}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        <span>{duration}</span>
                    </div>
                </div>

                {!isFaculty && (
                    <div style={{ marginTop: 'auto' }}>
                        <Link to={`/courses/${id}`}>
                            <Button variant="primary" style={{ width: '100%' }}>View Details</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CourseCard;
