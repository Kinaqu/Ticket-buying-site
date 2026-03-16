import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuthUser } from '../../components/AuthContextUser';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FlightCard = ({ ticket, onBuy }) => {
  const [buying, setBuying] = useState(false);
  const [bought, setBought] = useState(false);

  const dep = new Date(ticket.DepartureDateTime);
  const land = new Date(ticket.LandDateTime);
  const duration = Math.round((land - dep) / 60000);
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;

  const handleBuy = async () => {
    setBuying(true);
    try {
      await onBuy(ticket._id);
      setBought(true);
    } finally {
      setBuying(false);
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 18,
      padding: '24px 28px',
      transition: 'all 0.25s',
      position: 'relative',
      overflow: 'hidden',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(230,57,70,0.3)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 130, height: 90,
        background: 'radial-gradient(ellipse at top right, rgba(230,57,70,0.06), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'var(--red-muted)',
            border: '1px solid rgba(230,57,70,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>✈</div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Plane
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>{ticket.Plane}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '1.6rem',
            fontWeight: 700, color: 'var(--red-primary)',
          }}>
            ${Number(ticket.Price).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
            #{ticket.FlightNumber}
          </div>
        </div>
      </div>

      {/* Route */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            {ticket.CityDeparture}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{ticket.CountryDeparture}</div>
        </div>

        <div style={{ textAlign: 'center', flex: '0 0 auto', padding: '0 8px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>
            {hours > 0 ? `${hours}h ${mins}m` : `${mins}m`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red-primary)', flexShrink: 0 }} />
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--red-primary), var(--border-medium))', minWidth: 60 }} />
            <span style={{ color: 'var(--red-primary)', fontSize: 12 }}>→</span>
          </div>
        </div>

        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            {ticket.CityArrival}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{ticket.CountryArrival}</div>
        </div>
      </div>

      {/* Times */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'var(--bg-elevated)', borderRadius: 10,
        marginBottom: 18, fontSize: '0.82rem',
      }}>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Departs </span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {dep.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Lands </span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {land.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Buy */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleBuy} disabled={buying || bought} style={{
          padding: '9px 22px', borderRadius: 10,
          cursor: bought ? 'default' : 'pointer',
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem',
          background: bought ? 'rgba(52,211,153,0.15)' : 'var(--red-muted)',
          color: bought ? '#6ee7b7' : 'var(--red-primary)',
          border: `1px solid ${bought ? 'rgba(52,211,153,0.25)' : 'rgba(230,57,70,0.25)'}`,
          transition: 'all 0.2s', opacity: buying ? 0.7 : 1,
        }}
          onMouseEnter={e => !bought && (e.target.style.background = 'rgba(230,57,70,0.25)')}
          onMouseLeave={e => !bought && (e.target.style.background = 'var(--red-muted)')}
        >
          {bought ? '✓ Booked' : buying ? 'Booking…' : 'Book Ticket'}
        </button>
      </div>
    </div>
  );
};

const FlightTicketApp = () => {
  const { user } = useAuthUser();
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/api/AirplaneTicketUser?searchQuery=${searchQuery}`)
      .then(response => { setFlights(response.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [searchQuery]);

  const handleBuyClick = async (ticketId) => {
    const userId = user.id;
    await api.post(
      `/api/AirplaneTicketUser/${ticketId}/purchase`,
      { userId },
      { headers: { 'Content-Type': 'application/json' } }
    );
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Header */}
      <section style={{ padding: '60px 24px 40px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 999,
            background: 'var(--red-muted)', border: '1px solid rgba(230,57,70,0.2)',
            marginBottom: 16,
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--red-primary)' }}>
              ✈ Flight Tickets
            </span>
          </div>
          <h1 style={{ marginBottom: 8, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Find your flight</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Search available routes and book your seat instantly.</p>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', gap: 12, maxWidth: 520,
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 14, padding: '8px 8px 8px 18px', alignItems: 'center',
        }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>🔍</span>
          <input
            type="text"
            placeholder="Search by country or city…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1, background: 'transparent',
              color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
              fontSize: '0.95rem', outline: 'none',
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{
              background: 'transparent', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: 18, padding: '4px 8px',
            }}>×</button>
          )}
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: '0 24px', maxWidth: 1100, margin: '0 auto', width: '100%', paddingBottom: 100 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✈</div>
            <p>Loading flights…</p>
          </div>
        ) : flights.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 24px',
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 18, color: 'var(--text-muted)',
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🛫</div>
            <p style={{ fontSize: '1rem' }}>
              {searchQuery ? <>No flights found for <strong style={{ color: 'var(--text-secondary)' }}>"{searchQuery}"</strong></> : 'No flights available right now.'}
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>
              {flights.length} flight{flights.length !== 1 ? 's' : ''} available
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
              {flights.map(ticket => (
                <FlightCard key={ticket._id} ticket={ticket} onBuy={handleBuyClick} />
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default FlightTicketApp;