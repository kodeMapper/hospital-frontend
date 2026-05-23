import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDoctor } from '../api/hospitalApi';

export default function AddDoctor() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        id: '',
        name: '',
        department: '',
        specialization: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createDoctor({
            id: Number(form.id),
            name: form.name,
            department: form.department,
            specialization: form.specialization,
        });
        navigate('/staff');
    };

    return (
        <div className="card">
            <h2>Add Doctor</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <input name="id" placeholder="ID" value={form.id} onChange={handleChange} />
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
                <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />
                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        </div>
    );
}