import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Button from '../components/Button';
import { Search, Loader2, Plus } from 'lucide-react';
import { fetchCourses, deleteCourse } from '../api/apiClient';

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const getCourses = async () => {
            setLoading(true);
            try {
                const data = await fetchCourses();
                setCourses(data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };
        getCourses();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteCourse(id);
                setCourses(courses.filter(c => c.id !== id));
            } catch (error) {
                alert('Failed to delete course');
            }
        }
    };

    const isFaculty = user && user.role === 'faculty';
    const isAdmin = user && user.role === 'admin';

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Course Catalog</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Explore industry-leading courses and take your career to the next level.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className="glass-panel" style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.5rem 1rem',
                        width: '300px',
                        borderRadius: 'var(--radius-full)'
                    }}>
                        <Search size={20} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: 'var(--text-primary)',
                                marginLeft: '0.5rem',
                                width: '100%',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    {isFaculty && (
                        <Button
                            onClick={() => navigate('/add-course')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Plus size={18} /> Add Course
                        </Button>
                    )}
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                    <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                {...course}
                                showDelete={isFaculty || isAdmin}
                                isFaculty={isFaculty}
                                onDelete={() => handleDelete(course.id)}
                            />

                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>No courses found matching your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


export default Courses;

