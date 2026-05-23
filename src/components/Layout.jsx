import { Outlet, NavLink } from 'react-router-dom';
import { Activity, Users, UserRound, FolderOpen, HeartPulse } from 'lucide-react';

const Layout = () => {
  return (
      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <HeartPulse size={28} />
            <span>HMS Portal</span>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Activity size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/patients" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Users size={20} />
              <span>Patients</span>
            </NavLink>

            <NavLink to="/staff" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <UserRound size={20} />
              <span>Staff</span>
            </NavLink>

            <NavLink to="/cases" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FolderOpen size={20} />
              <span>Cases</span>
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <header className="header">
            <h2 className="page-title">Hospital Management System</h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="badge badge-success">Live System</span>
              <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--primary-color)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}
              >
                A
              </div>
            </div>
          </header>

          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
  );
};

export default Layout;