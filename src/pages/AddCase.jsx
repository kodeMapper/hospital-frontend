import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMedicalCase } from '../api/hospitalApi';

export default function AddCase() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        caseId: '',
        status: 'Open',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createMedicalCase({
            caseId: Number(form.caseId),
            status: form.status,
        });
        navigate('/cases');
    };

    return (
        <div className="card">
            <h2>Open New Case</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <input name="caseId" placeholder="Case ID" value={form.caseId} onChange={handleChange} />
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="Open">Open</option>
                    <option value="Operational">Operational</option>
                    <option value="Closed">Closed</option>
                </select>
                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        </div>
    );
}