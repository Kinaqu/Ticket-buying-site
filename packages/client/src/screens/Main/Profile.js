import React, { useEffect, useState } from 'react';
import { useAuthUser } from '../../components/AuthContextUser';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const UserTickets = () => {
  const { isAuthenticatedAsUser, user } = useAuthUser();
  const [trainTickets, setTrainTickets] = useState([]);
  const [flightTickets, setFlightTickets] = useState([]);

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        if (isAuthenticatedAsUser() && user) {
          const response = await axios.get(`http://localhost:3001/api/tickets/${user.id}`);
          const { trainTickets, flightTickets } = response.data;
          setTrainTickets(trainTickets);
          setFlightTickets(flightTickets);
        }
      } catch (error) {
        console.error('Error fetching user tickets:', error);
      }
    };

    fetchUserTickets();
  }, [isAuthenticatedAsUser, user]);


  return (
    <div>
      <Navbar/>
      <h2>Train Tickets</h2>
      <ul>
        {trainTickets.map((ticket) => (
          <li key={ticket._id}>
            {/* Отображение информации о билете на поезд */}
            {ticket.TransactionStatus}: {ticket.Train} - {ticket.CountryDeparture} to {ticket.CountryArrival}
          </li>
        ))}
      </ul>

      <h2>Plane Tickets</h2>
      <ul>
        {flightTickets.map((ticket) => (
          <li key={ticket._id}>
            {/* Отображение информации о билете на самолет */}
            {ticket.TransactionStatus}: {ticket.Plane} - {ticket.CountryDeparture} to {ticket.CountryArrival}
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default UserTickets;