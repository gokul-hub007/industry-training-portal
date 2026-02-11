import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchFaculty } from '../api/apiClient';

const Faculty = () => {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFaculty = async () => {
            setLoading(true);
            const data = await fetchFaculty();
            setFaculty(data);
            setLoading(false);
        };
        getFaculty();
    }, []);

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', color: 'var(--text-primary)' }}>
            <h1 style={{ marginBottom: '2rem' }}>Faculty Details</h1>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                    <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {faculty.length > 0 ? (
                        faculty.map((member) => (
                            <div key={member.id} className="glass-panel hover-zoom" style={{ padding: '2rem' }}>
                                <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    {member.name.charAt(0)}
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{member.name}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: 500, marginBottom: '1rem' }}>{member.role}</p>
                                <p style={{ color: 'var(--text-secondary)' }}>{member.bio}</p>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>No faculty members found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Faculty;

