import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainTicketForm from './TrainTicketForm';
import TrainTicketList from './TrainTicketList';
import AdminNavbar from '../../../components/AdminNavbar';
import Footer from '../../../components/Footer';

const EditTrainTicketsPage = () => {
  const [trainTickets, setTrainTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTrainTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/TrainTicket');
        setTrainTickets(response.data);
      } catch (error) {
        console.error('Error fetching train tickets:', error);
      }
    };

    fetchTrainTickets();
  }, []);

  const addTicket = (newTicket) => {
    setTrainTickets([...trainTickets, newTicket]);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div>
      <div><AdminNavbar/></div>
      <TrainTicketForm onAddTicket={addTicket} />
      <TrainTicketList tickets={trainTickets} onTicketClick={handleTicketClick} />
      <div><Footer /></div>
    </div>
  );
};

export default EditTrainTicketsPage;