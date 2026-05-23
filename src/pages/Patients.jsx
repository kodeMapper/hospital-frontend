import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { getPatients, deletePatient } from '../api/hospitalApi';

const Patients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm(`Delete patient #${id}?`);
    if (!ok) return;

    try {
      await deletePatient(id);
      await loadPatients();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || 'Delete failed');
    }
  };

  if (loading) return <div className="card">Loading patients...</div>;
  if (error) return <div className="card" style={{ color: 'crimson' }}>{error}</div>;

  return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Patient Management</h1>
          <button className="btn btn-primary" onClick={() => navigate('/patients/new')}>
            <Plus size={16} /> Add Patient
          </button>
        </div>

        <div className="card">
          <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Doctor</th>
                <th>Ward/Bed</th>
                <th>Diseases</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {patients.map((p) => (
                  <tr key={p.patientId}>
                    <td>#{p.patientId}</td>
                    <td style={{ fontWeight: 500 }}>{p.patientName}</td>
                    <td>{p.age}</td>
                    <td>{p.assignedDoctor?.name || p.assignedDoctor?.id || '-'}</td>
                    <td>
                      {p.ward || '-'} {p.bedNo ? `- Bed ${p.bedNo}` : ''}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {(p.diseases || []).map((d, i) => (
                            <span key={i} className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                          {d}
                        </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <button
                          className="btn btn-outline"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                          onClick={() => handleDelete(p.patientId)}
                          title="Delete Patient"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default Patients;