// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightTicketForm from './FlightTicketForm';
import FlightTicketList from './FlightTicketList';
import AdminNavbar from '../../../components/AdminNavbar';
import Footer from '../../../components/Footer';

const EditAirTicketsPage = () => {
  const [flightTickets, setFlightTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchFlightTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/FlightTicket');
        setFlightTickets(response.data);
      } catch (error) {
        console.error('Error fetching flight tickets:', error);
      }
    };

    fetchFlightTickets();
  }, []);

  const addTicket = (newTicket) => {
    setFlightTickets([...flightTickets, newTicket]);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div>
        <div><AdminNavbar/></div>
      <FlightTicketForm onAddTicket={addTicket} />
      <FlightTicketList tickets={flightTickets} onTicketClick={handleTicketClick} />
      <div><Footer /></div>
    </div>
  );
};

export default EditAirTicketsPage;
