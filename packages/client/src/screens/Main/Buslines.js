import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BuslinesPage = () => {
  const [buslines, setBuslines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/getBuslines')
      .then(response => { setBuslines(response.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />

      <section style={{ padding: '60px 24px 40px', maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 999,
            background: 'rgba(168,218,220,0.1)',
            border: '1px solid rgba(168,218,220,0.2)',
            marginBottom: 16,
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a8dadc' }}>
              🚌 Bus Lines
            </span>
          </div>
          <h1 style={{ marginBottom: 8, fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>Bus Routes</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Intercity and regional bus connections.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🚌</div>
            <p>Loading routes…</p>
          </div>
        ) : buslines.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 24px',
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 18,
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚉</div>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 8 }}>
              No routes available
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Bus routes haven't been added yet. Check back later.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {buslines.map((busline, i) => (
              <div key={busline.id || i} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 14,
                padding: '18px 20px',
                display: 'flex', alignItems: 'center', gap: 14,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(168,218,220,0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(168,218,220,0.1)',
                  border: '1px solid rgba(168,218,220,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                }}>🚌</div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {busline.name || `Route ${i + 1}`}
                  </div>
                  {busline.route && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{busline.route}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default BuslinesPage;