import React from 'react';

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 8,
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem',
  outline: 'none',
  boxSizing: 'border-box',
  WebkitAppearance: 'none',
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

const TrainTicketEditForm = ({
  ticket,
  onSave,
  onCancel,
  onCountryChange,
  onCityChange,
  uniqueDepartureCountries,
  filteredDepartureCities,
  uniqueArrivalCountries,
  filteredArrivalCities,
}) => (
  <div style={{
    background: 'var(--bg-elevated)',
    border: '1px solid rgba(220,38,38,0.2)',
    borderRadius: 14, padding: '20px', marginTop: 4,
  }}>
    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#dc2626', marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
      Editing ticket
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={labelStyle}>Train</label>
        <input style={inputStyle} type="text" value={ticket.Train}
          onChange={e => onCityChange('Train', e.target.value)}
          onFocus={e => e.target.style.borderColor = '#dc2626'}
          onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
        />
      </div>

      <div>
        <label style={labelStyle}>Departure Country</label>
        <select style={inputStyle} value={ticket.CountryDeparture}
          onChange={e => onCountryChange('CountryDeparture', e.target.value, true)}>
          <option value="" disabled>Select country</option>
          {uniqueDepartureCountries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Departure City</label>
        <select style={inputStyle} value={ticket.CityDeparture}
          onChange={e => onCityChange('CityDeparture', e.target.value)}>
          <option value="" disabled>Select city</option>
          {filteredDepartureCities?.map(c => <option key={c._id} value={c.CityName}>{c.CityName}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Arrival Country</label>
        <select style={inputStyle} value={ticket.CountryArrival}
          onChange={e => onCountryChange('CountryArrival', e.target.value, false)}>
          <option value="" disabled>Select country</option>
          {uniqueArrivalCountries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Arrival City</label>
        <select style={inputStyle} value={ticket.CityArrival}
          onChange={e => onCityChange('CityArrival', e.target.value)}>
          <option value="" disabled>Select city</option>
          {filteredArrivalCities?.map(c => <option key={c._id} value={c.CityName}>{c.CityName}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Price ($)</label>
        <input style={inputStyle} type="number" value={ticket.Price}
          onChange={e => onCityChange('Price', e.target.value)}
          onFocus={e => e.target.style.borderColor = '#dc2626'}
          onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
        />
      </div>
      <div>
        <label style={labelStyle}>Train Number</label>
        <input style={inputStyle} type="text" value={ticket.TrainNumber}
          onChange={e => onCityChange('TrainNumber', e.target.value)}
          onFocus={e => e.target.style.borderColor = '#dc2626'}
          onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
        />
      </div>

      <div>
        <label style={labelStyle}>Departure Date & Time</label>
        <input style={inputStyle} type="datetime-local" value={ticket.DepartureDateTime}
          onChange={e => onCityChange('DepartureDateTime', e.target.value)}
          onFocus={e => e.target.style.borderColor = '#dc2626'}
          onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
        />
      </div>
      <div>
        <label style={labelStyle}>Arrival Date & Time</label>
        <input style={inputStyle} type="datetime-local" value={ticket.ArriveDateTime}
          onChange={e => onCityChange('ArriveDateTime', e.target.value)}
          onFocus={e => e.target.style.borderColor = '#dc2626'}
          onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
        />
      </div>
    </div>

    <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
      <button onClick={onSave} style={{
        flex: 1, padding: '10px', borderRadius: 9, border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem',
        background: '#dc2626', color: '#fff',
      }}>Save Changes</button>
      <button onClick={onCancel} style={{
        padding: '10px 20px', borderRadius: 9, cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
        background: 'transparent', color: 'var(--text-secondary)',
        border: '1px solid var(--border-medium)',
      }}>Cancel</button>
    </div>
  </div>
);

export default TrainTicketEditForm;