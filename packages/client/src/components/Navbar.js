import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthUser } from './AuthContextUser';

function Navbar() {
  const { logout, isAuthenticatedAsUser } = useAuthUser();
  const [isUser, setIsUser] = useState(isAuthenticatedAsUser());
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsUser(isAuthenticatedAsUser());
  }, [isAuthenticatedAsUser]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px',
      background: scrolled
        ? 'rgba(8, 8, 16, 0.92)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <nav style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 34,
            height: 34,
            background: 'var(--red-primary)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px var(--red-glow)',
            fontSize: 16,
          }}>✈</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>FlyCo</span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {isUser ? (
            <>
              {[
                { to: '/', label: 'Home' },
                { to: '/airtickets', label: '✈ Flights' },
                { to: '/traintickets', label: '🚂 Trains' },
                { to: '/buslines', label: '🚌 Bus' },
                { to: '/profile', label: 'Profile' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} style={{
                  padding: '7px 14px',
                  borderRadius: 10,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive(to) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive(to) ? 'rgba(255,255,255,0.08)' : 'transparent',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}>
                  {label}
                </Link>
              ))}
              <button onClick={logout} style={{
                marginLeft: 8,
                padding: '7px 18px',
                borderRadius: 10,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--red-primary)',
                background: 'var(--red-muted)',
                border: '1px solid rgba(230,57,70,0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(230,57,70,0.25)'}
              onMouseLeave={e => e.target.style.background = 'var(--red-muted)'}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" style={{
                padding: '7px 14px',
                borderRadius: 10,
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}>Home</Link>
              <Link to="/login" style={{
                padding: '7px 18px',
                borderRadius: 10,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-medium)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}>Login</Link>
              <Link to="/signup" style={{
                marginLeft: 4,
                padding: '7px 18px',
                borderRadius: 10,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#fff',
                background: 'var(--red-primary)',
                boxShadow: '0 2px 12px var(--red-glow)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;