import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AccessDeniedUserPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
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
            background: 'var(--red-muted)',
            border: '1px solid rgba(230,57,70,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 24px',
          }}>🚫</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.9rem',
            color: 'var(--text-primary)', marginBottom: 10,
          }}>Access Denied</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.7 }}>
            You need to be logged in to view this page. Please sign in to your account to continue.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 12,
              background: 'var(--red-primary)', color: '#fff',
              fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '0 4px 16px var(--red-glow)',
              textDecoration: 'none',
            }}>
              Sign In →
            </Link>
            <Link to="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 12,
              border: '1px solid var(--border-medium)',
              color: 'var(--text-secondary)',
              fontWeight: 600, fontSize: '0.95rem',
              textDecoration: 'none',
            }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccessDeniedUserPage;