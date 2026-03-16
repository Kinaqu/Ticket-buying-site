import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

function AccessDeniedAdminPage() {
  return (
    <div className="page-wrapper">
      <AdminNavbar />
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: 420,
          animation: 'fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) both',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: 'rgba(220,38,38,0.1)',
            border: '1px solid rgba(220,38,38,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 24px',
          }}>🔐</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.9rem',
            color: 'var(--text-primary)', marginBottom: 10,
          }}>Access Denied</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.7 }}>
            You don't have permission to view this page. Please log in with an admin account.
          </p>
          <Link to="/admin/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 12,
            background: '#dc2626', color: '#fff',
            fontWeight: 700, fontSize: '0.95rem',
            boxShadow: '0 4px 16px rgba(220,38,38,0.35)',
            textDecoration: 'none', transition: 'all 0.2s',
          }}>
            Go to Admin Login →
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccessDeniedAdminPage;