import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPatient, getDoctors } from '../api/hospitalApi';

export default function AddPatient() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        patientId: '',
        patientName: '',
        age: '',
        assignedDoctorId: '',
        assignedNurse: '',
        ward: '',
        bedNo: '',
        diseasesText: '',
    });

    useEffect(() => {
        getDoctors().then(setDoctors).catch(() => setDoctors([]));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createPatient({
            patientId: Number(form.patientId),
            patientName: form.patientName,
            age: Number(form.age),
            assignedDoctor: { id: Number(form.assignedDoctorId) },
            assignedNurse: form.assignedNurse,
            ward: form.ward,
            bedNo: Number(form.bedNo),
            diseases: form.diseasesText
                .split(',')
                .map((d) => d.trim())
                .filter(Boolean),
        });

        navigate('/patients');
    };

    return (
        <div className="card">
            <h2>Add Patient</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <input name="patientId" placeholder="Patient ID" value={form.patientId} onChange={handleChange} />
                <input name="patientName" placeholder="Patient Name" value={form.patientName} onChange={handleChange} />
                <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />

                <select name="assignedDoctorId" value={form.assignedDoctorId} onChange={handleChange}>
                    <option value="">Select Doctor</option>
                    {doctors.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name} (#{d.id})
                        </option>
                    ))}
                </select>

                <input name="assignedNurse" placeholder="Assigned Nurse" value={form.assignedNurse} onChange={handleChange} />
                <input name="ward" placeholder="Ward" value={form.ward} onChange={handleChange} />
                <input name="bedNo" placeholder="Bed No" value={form.bedNo} onChange={handleChange} />
                <input
                    name="diseasesText"
                    placeholder="Diseases separated by comma"
                    value={form.diseasesText}
                    onChange={handleChange}
                />

                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        </div>
    );
}