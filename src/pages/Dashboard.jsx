import { useEffect, useState } from 'react';
import { Users, UserRound, FolderOpen, AlertCircle } from 'lucide-react';
import { getDoctors, getInterns, getPatients, getMedicalCases } from '../api/hospitalApi';

const StatCard = ({ title, value, icon, type }) => {
  return (
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: `var(--${type}-color)`,
              color: 'white',
              opacity: 0.9,
            }}
        >
          {icon}
        </div>
        <div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{title}</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{value}</p>
        </div>
      </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    staff: 0,
    cases: 0,
    activeCases: 0,
  });

  const [recentPatients, setRecentPatients] = useState([]);
  const [recentCases, setRecentCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [doctors, interns, patients, cases] = await Promise.all([
          getDoctors(),
          getInterns(),
          getPatients(),
          getMedicalCases(),
        ]);

        setStats({
          patients: patients.length,
          staff: doctors.length + interns.length,
          cases: cases.length,
          activeCases: cases.filter((c) => c.status !== 'Closed').length,
        });

        setRecentPatients(patients.slice(0, 5));
        setRecentCases(cases.slice(0, 5));
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="card">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="card" style={{ color: 'crimson' }}>{error}</div>;
  }

  return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Dashboard Overview</h1>
          <button className="btn btn-primary">Refresh Data</button>
        </div>

        <div className="grid grid-cols-3">
          <StatCard title="Total Patients" value={stats.patients} icon={<Users size={24} />} type="primary" />
          <StatCard title="Staff Members" value={stats.staff} icon={<UserRound size={24} />} type="success" />
          <StatCard title="Active Cases" value={stats.activeCases} icon={<AlertCircle size={24} />} type="warning" />
        </div>

        <div className="grid grid-cols-2" style={{ marginTop: '2rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Recent Patients</h3>
            <div className="table-container">
              <table>
                <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Ward</th>
                  <th>Doctor</th>
                </tr>
                </thead>
                <tbody>
                {recentPatients.map((p) => (
                    <tr key={p.patientId}>
                      <td>#{p.patientId}</td>
                      <td>{p.patientName}</td>
                      <td>{p.ward || '-'}</td>
                      <td>{p.assignedDoctor?.name || p.assignedDoctor?.id || '-'}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Recent Cases</h3>
            <div className="table-container">
              <table>
                <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {recentCases.map((c) => (
                    <tr key={c.caseId}>
                      <td>#{c.caseId}</td>
                      <td>
                      <span
                          className={`badge ${
                              c.status === 'Open'
                                  ? 'badge-primary'
                                  : c.status === 'Operational'
                                      ? 'badge-warning'
                                      : 'badge-neutral'
                          }`}
                      >
                        {c.status}
                      </span>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;