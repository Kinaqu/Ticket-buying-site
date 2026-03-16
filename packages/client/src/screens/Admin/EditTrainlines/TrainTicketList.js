import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api';
import TrainTicketEditForm from './TrainTicketEditForm';

const TrainTicketList = ({ onTicketClick }) => {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingTicket, setEditingTicket] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredDepartureCities, setFilteredDepartureCities] = useState([]);
  const [filteredArrivalCities, setFilteredArrivalCities] = useState([]);

  const uniqueCountries = [...new Set(countries.map(c => c.Country))];

  const fetchTickets = useCallback(async () => {
    try {
      const r = await api.get('/api/admin/TrainTicket');
      setTickets(r.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.all([
      api.get('/api/countries'),
      api.get('/api/cities'),
    ]).then(([cr, ci]) => {
      setCountries(cr.data);
      setCities(ci.data);
    }).catch(console.error);

    fetchTickets();
    const id = setInterval(fetchTickets, 10000);
    return () => clearInterval(id);
  }, [fetchTickets]);

  const handleSearch = async () => {
    if (!searchQuery) { fetchTickets(); return; }
    const r = await api.get(`/api/admin/TrainTicket?search=${searchQuery}`);
    setTickets(r.data);
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm('Delete this train ticket?')) return;
    await api.delete(`/api/admin/TrainTicket/${ticketId}`);
    fetchTickets();
  };

  const handleUpdate = async () => {
    await api.put(`/api/admin/TrainTicket/${editingTicket._id}`, editingTicket);
    setEditingTicket(null);
    fetchTickets();
  };

  const handleCountryChange = (field, value, isDep) => {
    const filtered = cities.filter(c => c.Country === value);
    isDep ? setFilteredDepartureCities(filtered) : setFilteredArrivalCities(filtered);
    setEditingTicket(t => ({
      ...t,
      [field]: value,
      [field === 'CountryDeparture' ? 'CityDeparture' : 'CityArrival']: '',
    }));
  };

  return (
    <div>
      {/* Search */}
      <div style={{
        display: 'flex', gap: 10, marginBottom: 20,
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
        borderRadius: 12, padding: '8px 8px 8px 16px', alignItems: 'center',
      }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 15 }}>🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Search by train name…"
          style={{
            flex: 1, border: 'none', background: 'transparent',
            color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
            fontSize: '0.9rem', outline: 'none',
          }}
        />
        <button onClick={handleSearch} style={{
          padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8rem',
          background: '#dc2626', color: '#fff',
        }}>Search</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading tickets…</div>
      ) : tickets.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '48px 24px',
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14,
          color: 'var(--text-muted)',
        }}>No train tickets found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tickets.map(ticket => (
            <div key={ticket._id} onClick={() => onTicketClick?.(ticket)}>
              {editingTicket?._id === ticket._id ? (
                <TrainTicketEditForm
                  ticket={editingTicket}
                  onSave={handleUpdate}
                  onCancel={() => setEditingTicket(null)}
                  onCountryChange={handleCountryChange}
                  onCityChange={(f, v) => setEditingTicket(t => ({ ...t, [f]: v }))}
                  uniqueDepartureCountries={uniqueCountries}
                  filteredDepartureCities={filteredDepartureCities}
                  uniqueArrivalCountries={uniqueCountries}
                  filteredArrivalCities={filteredArrivalCities}
                />
              ) : (
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 14, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 16, flexWrap: 'wrap',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 200 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, fontSize: 16, flexShrink: 0,
                      background: 'rgba(244,162,97,0.1)', border: '1px solid rgba(244,162,97,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>🚂</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{ticket.Train}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        {ticket.CityDeparture}, {ticket.CountryDeparture} → {ticket.CityArrival}, {ticket.CountryArrival}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 20, fontSize: '0.82rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Train </span>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>#{ticket.TrainNumber}</span>
                    </div>
                    <div>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--gold)' }}>
                        ${Number(ticket.Price).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>
                      {new Date(ticket.DepartureDateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={e => { e.stopPropagation(); setEditingTicket(ticket); }} style={{
                      padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem',
                      background: 'var(--bg-elevated)', color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}>Edit</button>
                    <button onClick={e => { e.stopPropagation(); handleDelete(ticket._id); }} style={{
                      padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem',
                      background: 'rgba(220,38,38,0.08)', color: '#dc2626',
                      border: '1px solid rgba(220,38,38,0.18)',
                    }}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainTicketList;