import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Staff from './pages/Staff';
import Cases from './pages/Cases';
import AddPatient from './pages/AddPatient';
import AddDoctor from './pages/AddDoctor';
import AddIntern from './pages/AddIntern.jsx';
import AddCase from './pages/AddCase';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="staff" element={<Staff />} />
          <Route path="cases" element={<Cases />} />

          <Route path="patients/new" element={<AddPatient />} />
          <Route path="staff/doctor/new" element={<AddDoctor />} />
          <Route path="staff/intern/new" element={<AddIntern />} />
          <Route path="cases/new" element={<AddCase />} />
        </Route>
      </Routes>
  );
}

export default App;