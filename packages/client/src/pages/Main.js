import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthUser } from '../components/AuthContextUser';

function MainPage() {
  const { isAuthenticatedAsUser } = useAuthUser();
  const isUser = isAuthenticatedAsUser();

  const features = [
    {
      icon: '✈',
      title: 'Flight Tickets',
      desc: 'Book flights across 10 countries to over 200 cities. Fast, reliable, affordable.',
      link: '/airtickets',
      color: '#e63946',
    },
    {
      icon: '🚂',
      title: 'Train Tickets',
      desc: 'Travel comfortably by rail. Explore cities at your own pace.',
      link: '/traintickets',
      color: '#f4a261',
    },
    {
      icon: '🚌',
      title: 'Bus Lines',
      desc: 'Budget-friendly intercity buses covering regional destinations.',
      link: '/buslines',
      color: '#a8dadc',
    },
  ];

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        padding: '100px 24px 80px',
        textAlign: 'center',
        maxWidth: 780,
        margin: '0 auto',
      }}>
        <div className="animate-fadeUp" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 14px',
          borderRadius: 999,
          background: 'var(--red-muted)',
          border: '1px solid rgba(230,57,70,0.2)',
          marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red-primary)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--red-primary)' }}>
            Online Booking Platform
          </span>
        </div>

        <h1 className="animate-fadeUp animate-delay-1" style={{ marginBottom: 20 }}>
          Travel the world,<br />
          <em style={{ fontStyle: 'italic', color: 'var(--red-primary)' }}>effortlessly</em>
        </h1>

        <p className="animate-fadeUp animate-delay-2" style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: 520,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Book flights, trains, and buses across Russia, Kazakhstan, Europe and beyond — all from one place.
        </p>

        <div className="animate-fadeUp animate-delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {isUser ? (
            <>
              <Link to="/airtickets" className="btn btn-primary btn-lg">Explore Flights →</Link>
              <Link to="/traintickets" className="btn btn-ghost btn-lg">View Trains</Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn-primary btn-lg">Get Started →</Link>
              <Link to="/login" className="btn btn-ghost btn-lg">Sign In</Link>
            </>
          )}
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '28px 24px',
        marginBottom: 80,
      }}>
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
        }}>
          {[
            { num: '10+', label: 'Countries' },
            { num: '200+', label: 'Cities' },
            { num: '3', label: 'Transport types' },
          ].map(({ num, label }, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '0 24px',
              borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1,
                marginBottom: 4,
              }}>{num}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section style={{ padding: '0 24px', maxWidth: 1100, margin: '0 auto 80px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 12 }}>Choose your journey</h2>
        <p style={{ textAlign: 'center', marginBottom: 48, color: 'var(--text-secondary)' }}>
          Three ways to travel, one seamless platform.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {features.map(({ icon, title, desc, link, color }) => (
            <Link key={link} to={isUser ? link : '/login'} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 20,
                padding: 28,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = color + '40';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px ${color}20`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {/* Glow blob */}
                <div style={{
                  position: 'absolute',
                  top: -30,
                  right: -30,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: color,
                  opacity: 0.06,
                  filter: 'blur(20px)',
                  pointerEvents: 'none',
                }} />

                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: color + '18',
                  border: `1px solid ${color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  marginBottom: 18,
                }}>
                  {icon}
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 8, color: 'var(--text-primary)' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>

                <div style={{
                  marginTop: 20,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  Book now <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Social / Support ──────────────────────────────────── */}
      <section style={{
        maxWidth: 700,
        margin: '0 auto 100px',
        padding: '40px 32px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 24,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 10 }}>Need help?</h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
          Our support team is available 24/7 on Telegram and Instagram.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://t.me/zPrFWL" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            📱 Telegram Support
          </a>
          <a href="https://www.instagram.com/zprfwl/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            📸 Instagram
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MainPage;