import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(8, 8, 16, 0.9)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '14px 32px',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: '#fff', fontWeight: 600, letterSpacing: '-0.01em', fontFamily: 'var(--font-display)' }}>
            ✈ FlyCo
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>— Your journey starts here</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { to: '/airtickets', label: 'Flights' },
            { to: '/traintickets', label: 'Trains' },
            { to: '/profile', label: 'Profile' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          © 2024 FlyCo. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;