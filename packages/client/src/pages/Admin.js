import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import { useAuthAdmin } from '../components/AuthContextAdmin';

const AdminPage = () => {
  const { isAuthenticatedAsAdmin } = useAuthAdmin();
  const isAdmin = isAuthenticatedAsAdmin();

  const panels = [
    { to: '/admin/edit_trains', icon: '🚂', title: 'Manage Trains', desc: 'Edit train names and update routes.' },
    { to: '/admin/edit_traintickets', icon: '🎫', title: 'Train Tickets', desc: 'Create, edit, and delete train ticket listings.' },
    { to: '/admin/edit_planes', icon: '✈', title: 'Manage Planes', desc: 'Update aircraft names and assignments.' },
    { to: '/admin/edit_airtickets', icon: '🎟', title: 'Air Tickets', desc: 'Manage all flight ticket inventory.' },
  ];

  return (
    <div className="page-wrapper">
      <AdminNavbar />

      <section style={{ padding: '60px 24px 40px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 999,
            background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)',
            marginBottom: 16,
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#dc2626' }}>
              🔐 Admin Dashboard
            </span>
          </div>
          <h1 style={{ marginBottom: 8, fontSize: '2.2rem' }}>Control Panel</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage all aspects of the FlyCo booking platform.
          </p>
        </div>

        {isAdmin ? (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
              marginBottom: 40,
            }}>
              {panels.map(({ to, icon, title, desc }) => (
                <Link key={to} to={to} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 16, padding: '24px 22px',
                    transition: 'all 0.25s', cursor: 'pointer',
                    height: '100%',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, marginBottom: 16,
                    }}>
                      {icon}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 6, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick note */}
            <div style={{
              padding: '16px 20px',
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.15)',
              borderRadius: 12,
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>ℹ️</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                All changes are applied immediately to the live platform. Be careful when deleting tickets or modifying routes.
              </p>
            </div>
          </>
        ) : (
          <div style={{
            textAlign: 'center', padding: '60px 32px',
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 20,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 10 }}>Authentication required</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 28 }}>
              You need to log in as admin to access the control panel.
            </p>
            <Link to="/admin/login" style={{
              display: 'inline-flex',
              padding: '12px 28px', borderRadius: 12,
              background: '#dc2626', color: '#fff',
              fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '0 4px 16px rgba(220,38,38,0.35)',
              textDecoration: 'none',
            }}>
              Go to Admin Login →
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default AdminPage;