import React, { useState, useEffect } from 'react';
import api from '../../api';

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

const focus = e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 2px rgba(220,38,38,0.15)'; };
const blur  = e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.boxShadow = 'none'; };

const TrainTicketForm = ({ onAddTicket }) => {
  const [newTicket, setNewTicket] = useState({
    Train: '', CountryDeparture: '', CountryArrival: '',
    CityDeparture: '', CityArrival: '',
    Price: 100000, TrainNumber: '00000',
    DepartureDateTime: new Date(), ArriveDateTime: new Date(),
  });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredDep, setFilteredDep] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(false);

  const uniqueCountries = [...new Set(countries.map(c => c.Country))];

  useEffect(() => {
    Promise.all([
      api.get('/api/countries'),
      api.get('/api/cities'),
    ]).then(([cr, ci]) => { setCountries(cr.data); setCities(ci.data); });
  }, []);

  const set = (k, v) => setNewTicket(t => ({ ...t, [k]: v }));

  const addTicket = async () => {
    setAdding(true);
    try {
      const r = await api.post('/api/admin/TrainTicket', newTicket);
      onAddTicket(r.data);
      setNewTicket({ Train: '', CountryDeparture: '', CountryArrival: '', CityDeparture: '', CityArrival: '', Price: 100000, TrainNumber: '00000', DepartureDateTime: new Date(), ArriveDateTime: new Date() });
      setOpen(false);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
      borderRadius: 16, marginBottom: 24, overflow: 'hidden',
    }}>
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
          <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Add New Train Ticket</span>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 18, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>›</span>
      </button>

      {open && (
        <div style={{ padding: '0 22px 22px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Train</label>
              <input style={inputStyle} type="text" value={newTicket.Train}
                onChange={e => set('Train', e.target.value)} placeholder="e.g. Sapsan"
                onFocus={focus} onBlur={blur} />
            </div>

            <div>
              <label style={labelStyle}>Departure Country</label>
              <select style={inputStyle} value={newTicket.CountryDeparture}
                onChange={e => { setFilteredDep(cities.filter(c => c.Country === e.target.value)); set('CountryDeparture', e.target.value); set('CityDeparture', ''); }}>
                <option value="" disabled>Select country</option>
                {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Departure City</label>
              <select style={inputStyle} value={newTicket.CityDeparture}
                onChange={e => set('CityDeparture', e.target.value)}>
                <option value="" disabled>Select city</option>
                {filteredDep.map(c => <option key={c._id} value={c.CityName}>{c.CityName}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Arrival Country</label>
              <select style={inputStyle} value={newTicket.CountryArrival}
                onChange={e => { setFilteredArr(cities.filter(c => c.Country === e.target.value)); set('CountryArrival', e.target.value); set('CityArrival', ''); }}>
                <option value="" disabled>Select country</option>
                {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Arrival City</label>
              <select style={inputStyle} value={newTicket.CityArrival}
                onChange={e => set('CityArrival', e.target.value)}>
                <option value="" disabled>Select city</option>
                {filteredArr.map(c => <option key={c._id} value={c.CityName}>{c.CityName}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Price ($)</label>
              <input style={inputStyle} type="number" value={newTicket.Price}
                onChange={e => set('Price', e.target.value)} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={labelStyle}>Train Number</label>
              <input style={inputStyle} type="text" value={newTicket.TrainNumber}
                onChange={e => set('TrainNumber', e.target.value)} onFocus={focus} onBlur={blur} />
            </div>

            <div>
              <label style={labelStyle}>Departure Date & Time</label>
              <input style={inputStyle} type="datetime-local"
                value={newTicket.DepartureDateTime instanceof Date ? newTicket.DepartureDateTime.toISOString().slice(0, 16) : newTicket.DepartureDateTime}
                onChange={e => set('DepartureDateTime', new Date(e.target.value))}
                onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={labelStyle}>Arrival Date & Time</label>
              <input style={inputStyle} type="datetime-local"
                value={newTicket.ArriveDateTime instanceof Date ? newTicket.ArriveDateTime.toISOString().slice(0, 16) : newTicket.ArriveDateTime}
                onChange={e => set('ArriveDateTime', new Date(e.target.value))}
                onFocus={focus} onBlur={blur} />
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

export default TrainTicketForm;