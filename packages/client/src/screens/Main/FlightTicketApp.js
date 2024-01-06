import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthUser } from '../../components/AuthContextUser';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AirplaneTicketApp = () => {
  const { user } = useAuthUser();
  const [airplaneTickets, setAirplaneTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Получение данных из коллекции AirplaneTicket с учетом поискового запроса
    axios.get(`http://localhost:3001/api/AirplaneTicketUser?searchQuery=${searchQuery}`)
      .then(response => setAirplaneTickets(response.data))
      .catch(error => console.error('Error fetching airplane tickets:', error));
  }, [searchQuery]);

  const handleBuyClick = async (airplaneTicketId) => {
    try {
      // Получение UserID из объекта пользователя в контексте аутентификации
      const userId = user.id;

      console.log('User ID:', userId);

      await axios.post(
        `http://localhost:3001/api/AirplaneTicketUser/${airplaneTicketId}/purchase`,
        { userId }, // Передача UserId в запросе
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Ticket successfully bought');
    } catch (error) {
      console.error('Error purchasing airplane ticket:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <input
        type="text"
        placeholder="Search by country or city"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {airplaneTickets.map(ticket => (
        <div key={ticket._id}>
          <p>{ticket.Airline}</p>
          <p>{ticket.CountryDeparture} - {ticket.CountryArrival}</p>
          <p>{ticket.CityDeparture} - {ticket.CityArrival}</p>
          <p>Price: {ticket.Price}</p>
          <button onClick={() => handleBuyClick(ticket._id)}>Buy</button>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default AirplaneTicketApp;
