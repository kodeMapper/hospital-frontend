import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Power, CheckCircle, FileX } from 'lucide-react';
import { getMedicalCases, updateMedicalCase } from '../api/hospitalApi';

const Cases = () => {
  const navigate = useNavigate();

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCases = async () => {
    try {
      setLoading(true);

      const data = await getMedicalCases();

      setCases(data);
    } catch (err) {
      setError(
          err?.response?.data?.message ||
          err.message ||
          'Failed to load cases'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const changeStatus = async (caseId, status) => {
    try {
      await updateMedicalCase(caseId, { status });

      await loadCases();
    } catch (err) {
      alert(
          err?.response?.data?.message ||
          err.message ||
          'Failed to update case'
      );
    }
  };

  // YOU FORGOT THIS FUNCTION
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return 'badge-primary';

      case 'Operational':
        return 'badge-warning';

      case 'Closed':
        return 'badge-neutral';

      default:
        return 'badge-neutral';
    }
  };

  if (loading) {
    return <div className="card">Loading cases...</div>;
  }

  if (error) {
    return (
        <div className="card" style={{ color: 'crimson' }}>
          {error}
        </div>
    );
  }

  return (
      <div>
        <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
        >
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
            Case Management
          </h1>

          <button
              className="btn btn-primary"
              onClick={() => navigate('/cases/new')}
          >
            Open New Case
          </button>
        </div>

        <div className="card">
          <div
              className="table-container"
              style={{ border: 'none', boxShadow: 'none' }}
          >
            <table>
              <thead>
              <tr>
                <th>Case ID</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
              </thead>

              <tbody>
              {cases.map((c) => (
                  <tr key={c.caseId}>
                    <td style={{ fontWeight: 500 }}>
                      #{c.caseId}
                    </td>

                    <td>
                    <span
                        className={`badge ${getStatusBadge(c.status)}`}
                    >
                      {c.status}
                    </span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            className="btn btn-outline"
                            style={{
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.75rem',
                              borderColor: 'var(--primary-color)',
                              color: 'var(--primary-color)',
                            }}
                            disabled={c.status === 'Open'}
                            onClick={() =>
                                changeStatus(c.caseId, 'Open')
                            }
                        >
                          <Power size={14} /> Open
                        </button>

                        <button
                            className="btn btn-outline"
                            style={{
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.75rem',
                              borderColor: 'var(--warning-color)',
                              color: 'var(--warning-color)',
                            }}
                            disabled={c.status === 'Operational'}
                            onClick={() =>
                                changeStatus(c.caseId, 'Operational')
                            }
                        >
                          <CheckCircle size={14} /> Operate
                        </button>

                        <button
                            className="btn btn-outline"
                            style={{
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.75rem',
                              borderColor: 'var(--text-secondary)',
                              color: 'var(--text-secondary)',
                            }}
                            disabled={c.status === 'Closed'}
                            onClick={() =>
                                changeStatus(c.caseId, 'Closed')
                            }
                        >
                          <FileX size={14} /> Close
                        </button>
                      </div>
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

export default Cases;