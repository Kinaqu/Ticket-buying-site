import React, { useState, useEffect } from 'react';
import api from '../../api';
import FlightTicketForm from './FlightTicketForm';
import FlightTicketList from './FlightTicketList';
import AdminNavbar from '../../../components/AdminNavbar';
import Footer from '../../../components/Footer';

const EditAirTicketsPage = () => {
  const [flightTickets, setFlightTickets] = useState([]);

  useEffect(() => {
    api.get('/api/admin/FlightTicket')
      .then(r => setFlightTickets(r.data))
      .catch(console.error);
  }, []);

  const addTicket = (newTicket) => setFlightTickets(prev => [newTicket, ...prev]);

  return (
    <div className="page-wrapper">
      <AdminNavbar />
      <section style={{ padding: '50px 24px 40px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ marginBottom: 6 }}>Flight Tickets</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Create, edit, and delete flight ticket listings.</p>
        </div>
        <FlightTicketForm onAddTicket={addTicket} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 16, color: 'var(--text-primary)' }}>
          All Tickets
        </h2>
        <FlightTicketList tickets={flightTickets} onTicketClick={() => {}} />
      </section>
      <Footer />
    </div>
  );
};

export default EditAirTicketsPage;