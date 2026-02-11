import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { fetchFacultyAnalytics, fetchStudentsRegistry, fetchFaculty, updateStudent, deleteStudent, updateFaculty, deleteFaculty } from '../api/apiClient';
import { TrendingUp, Users, Award, Star, Loader2, Edit2, Trash2, Save, X } from 'lucide-react';

const enrolledCourses = [
    {
        id: 1,
        title: "Advanced System Design",
        instructor: "Jane Doe",
        duration: "8 weeks",
        rating: "4.9",
        students: "1.2k",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
        tags: ['Architecture', 'Backend'],
        video_url: "https://www.youtube.com/watch?v=i53Gi_K397I"
    }
];

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            if (parsedUser.role === 'faculty') {
                loadFacultyData();
            } else if (parsedUser.role === 'admin') {
                loadAdminData();
            } else {
                setLoading(false);
            }
        }
    }, []);

    const loadFacultyData = async () => {
        setLoading(true);
        try {
            const [analyticsData, studentsData] = await Promise.all([
                fetchFacultyAnalytics(),
                fetchStudentsRegistry()
            ]);
            setAnalytics(analyticsData);
            setStudents(studentsData);
        } catch (error) {
            console.error('Failed to load faculty data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadAdminData = async () => {
        setLoading(true);
        try {
            const [studentsData, facultyData] = await Promise.all([
                fetchStudentsRegistry(),
                fetchFaculty()
            ]);
            setStudents(studentsData);
            setFaculty(facultyData);
        } catch (error) {
            console.error('Failed to load admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (item, type) => {
        setEditingId(`${type}-${item.id}`);
        setEditForm({ ...item, type });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSave = async () => {
        try {
            if (editForm.type === 'student') {
                await updateStudent(editForm.id, editForm);
                alert('Student updated');
            } else {
                await updateFaculty(editForm.id, editForm);
                alert('Faculty updated');
            }
            // Reload data
            loadAdminData();
            setEditingId(null);
        } catch (error) {
            alert('Failed to update: ' + error.message);
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;
        try {
            if (type === 'student') {
                await deleteStudent(id);
            } else {
                await deleteFaculty(id);
            }
            loadAdminData();
        } catch (error) {
            alert('Failed to delete: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-dark)' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            </div>
        );
    }

    const isFaculty = user?.role === 'faculty';
    const isAdmin = user?.role === 'admin';

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>
                    {isFaculty ? 'Faculty Analytics Overview' : `Welcome, ${user ? user.name : 'Learner'}!`}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    {isAdmin
                        ? 'Manage students and faculty members.'
                        : isFaculty
                            ? 'Monitor your course performance and student engagement.'
                            : 'Track your progress and continue your learning journey.'}
                </p>
            </div>

            {isFaculty ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
                                <Users size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Total Students Registered</p>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{analytics?.total_students || 0}</h3>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', color: '#10b981' }}>
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Weekly Faculty Ranking</p>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>#{analytics?.weekly_ranking || '-'}</h3>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', color: '#f59e0b' }}>
                                <Award size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Avg. Student Rating</p>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>4.9/5</h3>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                        {/* Student Registry Table */}
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Users size={20} /> Students Registry
                            </h2>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                        <tr>
                                            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Name</th>
                                            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Course</th>
                                            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Progress</th>
                                            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '1rem 0' }}>
                                                    <p style={{ fontWeight: 500 }}>{student.name}</p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{student.email}</p>
                                                </td>
                                                <td style={{ padding: '1rem 0', fontSize: '0.9rem' }}>{student.course}</td>
                                                <td style={{ padding: '1rem 0' }}>
                                                    <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                                                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--primary)', width: student.progress }} />
                                                    </div>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>{student.progress}</span>
                                                </td>
                                                <td style={{ padding: '1rem 0' }}>
                                                    <span style={{
                                                        fontSize: '0.7rem',
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: 'var(--radius-full)',
                                                        background: 'rgba(16, 185, 129, 0.1)',
                                                        color: '#10b981',
                                                        border: '1px solid rgba(16, 185, 129, 0.2)'
                                                    }}>
                                                        Active
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Peer Ratings Comparison */}
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Star size={20} /> Peer Ratings
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {analytics?.peer_ratings.map((peer, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                            <span>{peer.name}</span>
                                            <span style={{ fontWeight: 600 }}>{peer.rating}</span>
                                        </div>
                                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%',
                                                background: peer.name.includes(user.name) ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                                                width: `${(peer.rating / 5) * 100}%`,
                                                borderRadius: '4px'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem', fontStyle: 'italic' }}>
                                    * Rankings are updated every Monday at 12:00 AM.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : isAdmin ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {/* Faculty Management */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Faculty Management</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Name</th>
                                    <th style={{ padding: '1rem' }}>Role</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {faculty.map(f => (
                                    <tr key={f.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            {editingId === `faculty-${f.id}` ? (
                                                <input
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.5rem', color: 'white' }}
                                                />
                                            ) : f.name}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {editingId === `faculty-${f.id}` ? (
                                                <input
                                                    value={editForm.role}
                                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.5rem', color: 'white' }}
                                                />
                                            ) : f.role}
                                        </td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            {editingId === `faculty-${f.id}` ? (
                                                <>
                                                    <button onClick={handleSave} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--success)' }}><Save size={18} /></button>
                                                    <button onClick={handleCancelEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={18} /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(f, 'faculty')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit2 size={18} /></button>
                                                    <button onClick={() => handleDelete(f.id, 'faculty')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)' }}><Trash2 size={18} /></button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Student Management */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Student Registry</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Name</th>
                                    <th style={{ padding: '1rem' }}>Email</th>
                                    <th style={{ padding: '1rem' }}>Course</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(s => (
                                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            {editingId === `student-${s.id}` ? (
                                                <input
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.5rem', color: 'white' }}
                                                />
                                            ) : s.name}
                                        </td>
                                        <td style={{ padding: '1rem' }}>{s.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            {editingId === `student-${s.id}` ? (
                                                <input
                                                    value={editForm.course}
                                                    onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                                                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.5rem', color: 'white' }}
                                                />
                                            ) : s.course}
                                        </td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            {editingId === `student-${s.id}` ? (
                                                <>
                                                    <button onClick={handleSave} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--success)' }}><Save size={18} /></button>
                                                    <button onClick={handleCancelEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={18} /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(s, 'student')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit2 size={18} /></button>
                                                    <button onClick={() => handleDelete(s.id, 'student')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)' }}><Trash2 size={18} /></button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>In Progress</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {enrolledCourses.map((course, index) => (
                            <CourseCard key={index} {...course} isFaculty={false} />
                        ))}
                    </div>
                </div>
            )}
        </div >
    );
};

export default Dashboard;


