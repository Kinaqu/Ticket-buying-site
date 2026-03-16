import React, { useState, useEffect } from 'react';
import axios from 'axios';

const inputStyle = {
  width: '100%',
  padding: '10px 13px',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 9,
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
  WebkitAppearance: 'none',
  transition: 'border-color 0.18s, box-shadow 0.18s',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: 5,
};

const FlightTicketForm = ({ onAddTicket }) => {
  const [newTicket, setNewTicket] = useState({
    Plane: '',
    CountryDeparture: '',
    CountryArrival: '',
    CityDeparture: '',
    CityArrival: '',
    Price: 100000,
    FlightNumber: '00000',
    DepartureDateTime: new Date(),
    LandDateTime: new Date(),
  });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredDepartureCities, setFilteredDepartureCities] = useState([]);
  const [filteredArrivalCities, setFilteredArrivalCities] = useState([]);
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(false);

  const uniqueCountries = [...new Set(countries.map(c => c.Country))];

  useEffect(() => {
    const fetch = async () => {
      const [cr, ci] = await Promise.all([
        axios.get('http://localhost:3001/api/countries'),
        axios.get('http://localhost:3001/api/cities'),
      ]);
      setCountries(cr.data);
      setCities(ci.data);
    };
    fetch().catch(console.error);
  }, []);

  const set = (key, val) => setNewTicket(t => ({ ...t, [key]: val }));

  const handleCountryDep = (val) => {
    setFilteredDepartureCities(cities.filter(c => c.Country === val));
    setNewTicket(t => ({ ...t, CountryDeparture: val, CityDeparture: '' }));
  };

  const handleCountryArr = (val) => {
    setFilteredArrivalCities(cities.filter(c => c.Country === val));
    setNewTicket(t => ({ ...t, CountryArrival: val, CityArrival: '' }));
  };

  const addTicket = async () => {
    setAdding(true);
    try {
      const response = await axios.post('http://localhost:3001/api/admin/FlightTicket', newTicket);
      onAddTicket(response.data);
      setNewTicket({ Plane: '', CountryDeparture: '', CountryArrival: '', CityDeparture: '', CityArrival: '', Price: 100000, FlightNumber: '00000', DepartureDateTime: new Date(), LandDateTime: new Date() });
      setOpen(false);
    } catch (error) {
      console.error('Error adding ticket:', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 16, marginBottom: 24,
      overflow: 'hidden',
    }}>
      {/* Header toggle */}
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', padding: '18px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'transparent', border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
          }}>+</div>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Add New Flight Ticket</span>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 18, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>›</span>
      </button>

      {open && (
        <div style={{ padding: '0 22px 22px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Plane</label>
              <input style={inputStyle} type="text" value={newTicket.Plane}
                onChange={e => set('Plane', e.target.value)} placeholder="e.g. Boeing 737"
                onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 2px rgba(220,38,38,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div>
              <label style={labelStyle}>Departure Country</label>
              <select style={inputStyle} value={newTicket.CountryDeparture} onChange={e => handleCountryDep(e.target.value)}>
                <option value="" disabled>Select country</option>
                {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Departure City</label>
              <select style={inputStyle} value={newTicket.CityDeparture} onChange={e => set('CityDeparture', e.target.value)}>
                <option value="" disabled>Select city</option>
                {filteredDepartureCities.map(c => <option key={c._id} value={c.CityName}>{c.CityName}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Arrival Country</label>
              <select style={inputStyle} value={newTicket.CountryArrival} onChange={e => handleCountryArr(e.target.value)}>
                <option value="" disabled>Select country</option>
                {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Arrival City</label>
              <select style={inputStyle} value={newTicket.CityArrival} onChange={e => set('CityArrival', e.target.value)}>
                <option value="" disabled>Select city</option>
                {filteredArrivalCities.map(c => <option key={c._id} value={c.CityName}>{c.CityName}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Price ($)</label>
              <input style={inputStyle} type="number" value={newTicket.Price}
                onChange={e => set('Price', e.target.value)}
                onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 2px rgba(220,38,38,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div>
              <label style={labelStyle}>Flight Number</label>
              <input style={inputStyle} type="text" value={newTicket.FlightNumber}
                onChange={e => set('FlightNumber', e.target.value)}
                onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 2px rgba(220,38,38,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div>
              <label style={labelStyle}>Departure Date & Time</label>
              <input style={inputStyle} type="datetime-local"
                value={newTicket.DepartureDateTime instanceof Date
                  ? newTicket.DepartureDateTime.toISOString().slice(0, 16)
                  : newTicket.DepartureDateTime}
                onChange={e => set('DepartureDateTime', new Date(e.target.value))}
                onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 2px rgba(220,38,38,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div>
              <label style={labelStyle}>Landing Date & Time</label>
              <input style={inputStyle} type="datetime-local"
                value={newTicket.LandDateTime instanceof Date
                  ? newTicket.LandDateTime.toISOString().slice(0, 16)
                  : newTicket.LandDateTime}
                onChange={e => set('LandDateTime', new Date(e.target.value))}
                onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 2px rgba(220,38,38,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={addTicket} disabled={adding} style={{
              flex: 1, padding: '11px', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem',
              background: '#dc2626', color: '#fff',
              boxShadow: '0 2px 10px rgba(220,38,38,0.3)',
              opacity: adding ? 0.7 : 1, transition: 'opacity 0.2s',
            }}>
              {adding ? 'Adding…' : '+ Add Ticket'}
            </button>
            <button onClick={() => setOpen(false)} style={{
              padding: '11px 20px', borderRadius: 9, cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
              background: 'transparent', color: 'var(--text-secondary)',
              border: '1px solid var(--border-medium)',
            }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightTicketForm;