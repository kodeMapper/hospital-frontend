import axios from 'axios';

const api = axios.create({
    baseURL: 'hospital-backend-live.up.railway.app' || 'http://localhost:8080',
});

export const getDoctors = async () => (await api.get('/api/doctors')).data;
export const createDoctor = async (data) => (await api.post('/api/doctors', data)).data;
export const updateDoctor = async (id, data) => (await api.put(`/api/doctors/${id}`, data)).data;
export const deleteDoctor = async (id) => (await api.delete(`/api/doctors/${id}`)).data;

export const getInterns = async () => (await api.get('/api/interns')).data;
export const createIntern = async (data) => (await api.post('/api/interns', data)).data;
export const updateIntern = async (id, data) => (await api.put(`/api/interns/${id}`, data)).data;
export const deleteIntern = async (id) => (await api.delete(`/api/interns/${id}`)).data;

export const getPatients = async () => (await api.get('/api/patients')).data;
export const createPatient = async (data) => (await api.post('/api/patients', data)).data;
export const updatePatient = async (id, data) => (await api.put(`/api/patients/${id}`, data)).data;
export const deletePatient = async (id) => (await api.delete(`/api/patients/${id}`)).data;

export const getMedicalCases = async () => (await api.get('/api/medical-cases')).data;
export const createMedicalCase = async (data) => (await api.post('/api/medical-cases', data)).data;
export const updateMedicalCase = async (id, data) => (await api.put(`/api/medical-cases/${id}`, data)).data;
export const deleteMedicalCase = async (id) => (await api.delete(`/api/medical-cases/${id}`)).data;