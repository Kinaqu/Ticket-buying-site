import React from 'react';

const FlightTicketInfo = ({ ticket, onEditClick, onDeleteClick }) => (
  <div style={{
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 12,
    padding: '16px 20px',
  }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px', marginBottom: 14 }}>
      {[
        ['Plane', ticket.Plane],
        ['Flight Number', `#${ticket.FlightNumber}`],
        ['Departure', `${ticket.CityDeparture}, ${ticket.CountryDeparture}`],
        ['Arrival', `${ticket.CityArrival}, ${ticket.CountryArrival}`],
        ['Departs', new Date(ticket.DepartureDateTime).toLocaleString()],
        ['Lands', new Date(ticket.LandDateTime).toLocaleString()],
        ['Price', new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ticket.Price)],
      ].map(([label, value]) => (
        <div key={label}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 2 }}>
            {label}
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => onEditClick(ticket)} style={{
        padding: '7px 16px', borderRadius: 8, cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem',
        background: 'var(--bg-elevated)', color: 'var(--text-secondary)',
        border: '1px solid var(--border-subtle)',
      }}>Edit</button>
      <button onClick={() => onDeleteClick(ticket._id)} style={{
        padding: '7px 16px', borderRadius: 8, cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem',
        background: 'rgba(220,38,38,0.08)', color: '#dc2626',
        border: '1px solid rgba(220,38,38,0.18)',
      }}>Delete</button>
    </div>
  </div>
);

export default FlightTicketInfo;