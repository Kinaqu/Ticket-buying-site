import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthAdmin } from './AuthContextAdmin';

function AdminNavbar() {
  const { logout, isAuthenticatedAsAdmin } = useAuthAdmin();
  const [isAdmin, setIsAdmin] = useState(isAuthenticatedAsAdmin());
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAdmin(isAuthenticatedAsAdmin());
  }, [isAuthenticatedAsAdmin]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/admin/edit_trains', label: '🚂 Trains' },
    { to: '/admin/edit_traintickets', label: '🎫 Train Tickets' },
    { to: '/admin/edit_planes', label: '✈ Planes' },
    { to: '/admin/edit_airtickets', label: '🎟 Air Tickets' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px',
      background: scrolled ? 'rgba(8, 8, 16, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(220,38,38,0.15)' : '1px solid transparent',
      transition: 'all 0.3s',
    }}>
      <nav style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        {/* Brand */}
        <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 32,
            height: 32,
            background: '#dc2626',
            borderRadius: 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            boxShadow: '0 0 12px rgba(220,38,38,0.35)',
          }}>🔐</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}>
            FlyCo <span style={{ color: '#dc2626', fontStyle: 'italic' }}>Admin</span>
          </span>
        </Link>

        {/* Admin links */}
        {isAdmin ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} style={{
                padding: '6px 13px',
                borderRadius: 9,
                fontSize: '0.83rem',
                fontWeight: 500,
                color: isActive(to) ? '#fff' : 'var(--text-secondary)',
                background: isActive(to) ? 'rgba(220,38,38,0.25)' : 'transparent',
                border: isActive(to) ? '1px solid rgba(220,38,38,0.3)' : '1px solid transparent',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}>
                {label}
              </Link>
            ))}
            <button onClick={logout} style={{
              marginLeft: 8,
              padding: '6px 16px',
              borderRadius: 9,
              fontSize: '0.83rem',
              fontWeight: 700,
              color: '#dc2626',
              background: 'rgba(220,38,38,0.1)',
              border: '1px solid rgba(220,38,38,0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(220,38,38,0.2)'}
            onMouseLeave={e => e.target.style.background = 'rgba(220,38,38,0.1)'}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/admin/login" style={{
            padding: '7px 18px',
            borderRadius: 9,
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#fff',
            background: '#dc2626',
            textDecoration: 'none',
          }}>
            Login to Admin
          </Link>
        )}
      </nav>
    </header>
  );
}

export default AdminNavbar;