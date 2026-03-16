import React, { useEffect, useState } from 'react';
import { useAuthUser } from '../../components/AuthContextUser';
import api from '../../api';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const statusConfig = {
  'подтверждено': { label: 'Confirmed', color: '#6ee7b7', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
  'ожидание':     { label: 'Pending',   color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)'  },
  'ошибка':       { label: 'Failed',    color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
};

const TicketRow = ({ ticket, type }) => {
  const status = statusConfig[ticket.TransactionStatus] || statusConfig['ожидание'];
  const name = type === 'train' ? ticket.Train : ticket.Plane;
  const icon = type === 'train' ? '🚂' : '✈';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 12,
      transition: 'border-color 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9, fontSize: 16,
          background: type === 'train' ? 'rgba(244,162,97,0.1)' : 'rgba(230,57,70,0.1)',
          border: `1px solid ${type === 'train' ? 'rgba(244,162,97,0.2)' : 'rgba(230,57,70,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{name}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
            {ticket.CountryDeparture} → {ticket.CountryArrival}
          </div>
        </div>
      </div>
      <span style={{
        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
        textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999,
        color: status.color, background: status.bg, border: `1px solid ${status.border}`,
      }}>
        {status.label}
      </span>
    </div>
  );
};

const UserTickets = () => {
  const { isAuthenticatedAsUser, user } = useAuthUser();
  const [trainTickets, setTrainTickets] = useState([]);
  const [flightTickets, setFlightTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('flights');

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        if (isAuthenticatedAsUser() && user) {
          const response = await api.get(`/api/tickets/${user.id}`);
          setTrainTickets(response.data.trainTickets || []);
          setFlightTickets(response.data.flightTickets || []);
        }
      } catch (error) {
        console.error('Error fetching user tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserTickets();
  }, [isAuthenticatedAsUser, user]);

  const tabs = [
    { key: 'flights', label: '✈ Flights', count: flightTickets.length },
    { key: 'trains',  label: '🚂 Trains',  count: trainTickets.length  },
  ];

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Header */}
      <section style={{ padding: '60px 24px 40px', maxWidth: 800, margin: '0 auto', width: '100%' }}>
        {/* Avatar / greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 40 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 18,
            background: 'linear-gradient(135deg, var(--red-primary), #f4a261)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: '#fff',
            boxShadow: '0 4px 20px var(--red-glow)',
          }}>
            {user?.firstName?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 4 }}>My Bookings</h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {flightTickets.length + trainTickets.length} total reservation{flightTickets.length + trainTickets.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 4,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 12,
          padding: 4,
          marginBottom: 24,
          width: 'fit-content',
        }}>
          {tabs.map(({ key, label, count }) => (
            <button key={key} onClick={() => setActiveTab(key)} style={{
              padding: '8px 20px',
              borderRadius: 9,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              background: activeTab === key ? 'var(--bg-card)' : 'transparent',
              color: activeTab === key ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: activeTab === key ? '0 1px 6px rgba(0,0,0,0.25)' : 'none',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {label}
              <span style={{
                minWidth: 20, height: 20, borderRadius: 999,
                background: activeTab === key ? 'var(--red-muted)' : 'rgba(255,255,255,0.06)',
                color: activeTab === key ? 'var(--red-primary)' : 'var(--text-muted)',
                fontSize: '0.7rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 6px',
              }}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
            Loading your bookings…
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(activeTab === 'flights' ? flightTickets : trainTickets).length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '48px 24px',
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 16, color: 'var(--text-muted)',
              }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{activeTab === 'flights' ? '✈' : '🚂'}</div>
                <p>No {activeTab === 'flights' ? 'flight' : 'train'} bookings yet.</p>
              </div>
            ) : (
              (activeTab === 'flights' ? flightTickets : trainTickets).map((ticket) => (
                <TicketRow key={ticket._id} ticket={ticket} type={activeTab === 'flights' ? 'flight' : 'train'} />
              ))
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default UserTickets;