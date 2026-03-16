import React, { useState, useEffect } from 'react';
import api from '../../../api';
import TrainTicketForm from './TrainTicketForm';
import TrainTicketList from './TrainTicketList';
import AdminNavbar from '../../../components/AdminNavbar';
import Footer from '../../../components/Footer';

const EditTrainTicketsPage = () => {
  const [trainTickets, setTrainTickets] = useState([]);

  useEffect(() => {
    api.get('/api/admin/TrainTicket')
      .then(r => setTrainTickets(r.data))
      .catch(console.error);
  }, []);

  const addTicket = (newTicket) => setTrainTickets(prev => [newTicket, ...prev]);

  return (
    <div className="page-wrapper">
      <AdminNavbar />
      <section style={{ padding: '50px 24px 40px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ marginBottom: 6 }}>Train Tickets</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Create, edit, and delete train ticket listings.</p>
        </div>
        <TrainTicketForm onAddTicket={addTicket} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 16, color: 'var(--text-primary)' }}>
          All Tickets
        </h2>
        <TrainTicketList tickets={trainTickets} onTicketClick={() => {}} />
      </section>
      <Footer />
    </div>
  );
};

export default EditTrainTicketsPage;