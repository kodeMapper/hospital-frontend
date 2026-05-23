import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, GraduationCap } from 'lucide-react';
import { getDoctors, getInterns } from '../api/hospitalApi';

const Staff = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [interns, setInterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const [doctorData, internData] = await Promise.all([getDoctors(), getInterns()]);
                setDoctors(doctorData);
                setInterns(internData);
            } catch (err) {
                setError(err?.response?.data?.message || err.message || 'Failed to load staff');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const staff = [
        ...doctors.map((d) => ({ ...d, isIntern: false })),
        ...interns.map((i) => ({ ...i, isIntern: true })),
    ];

    if (loading) return <div className="card">Loading staff...</div>;
    if (error) return <div className="card" style={{ color: 'crimson' }}>{error}</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Staff Directory</h1>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/staff/doctor/new')}>
                        Add Doctor
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/staff/intern/new')}>
                        Add Intern
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2">
                {staff.map((member) => (
                    <div key={`${member.isIntern ? 'intern' : 'doctor'}-${member.id}`} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: member.isIntern ? 'rgba(37, 99, 235, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                color: member.isIntern ? 'var(--primary-color)' : 'var(--success-color)',
                            }}
                        >
                            {member.isIntern ? <GraduationCap size={32} /> : <Stethoscope size={32} />}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{member.name}</h3>
                                <span className={`badge ${member.isIntern ? 'badge-primary' : 'badge-success'}`}>
                  {member.isIntern ? 'Intern' : 'Doctor'}
                </span>
                            </div>

                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                ID: #{member.id}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <div>
                                    <span style={{ color: 'var(--text-secondary)' }}>Department:</span>
                                    <div style={{ fontWeight: 500 }}>{member.department}</div>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-secondary)' }}>Specialization:</span>
                                    <div style={{ fontWeight: 500 }}>{member.specialization}</div>
                                </div>
                                {member.isIntern && (
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Duration:</span>
                                        <div style={{ fontWeight: 500 }}>{member.duration} Months</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Staff;
