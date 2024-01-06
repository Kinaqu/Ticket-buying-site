import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthUser } from '../../components/AuthContextUser';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const TrainTicketApp = () => {
  const {  user } = useAuthUser();
  const [trains, setTrains] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Получение данных из коллекции TrainTicket с учетом поискового запроса
    axios.get(`http://localhost:3001/api/TrainTicketUser?searchQuery=${searchQuery}`)
      .then(response => setTrains(response.data))
      .catch(error => console.error('Error fetching trains:', error));
  }, [searchQuery]);

  const handleBuyClick = async (trainTicketId) => {
    try {
      // Получение UserID из объекта пользователя в контексте аутентификации
      const userId = user.id;
  
      console.log('User ID:', userId);
  
      await axios.post(
        `http://localhost:3001/api/TrainTicketUser/${trainTicketId}/purchase`,
        { userId }, // Передача UserId в запросе
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      alert('Ticket successfully bought');
    } catch (error) {
      console.error('Error purchasing train ticket:', error);
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
    {trains.map(train => (
      <div key={train._id}>
        <p>{train.Train}</p>
        <p>{train.CountryDeparture} - {train.CountryArrival}</p>
        <p>{train.CityDeparture} - {train.CityArrival}</p>
        <p>Price: {train.Price}</p>
        <button onClick={() => handleBuyClick(train._id)}>Buy</button>
      </div>
    ))}
    <Footer />
  </div>
);
  };

export default TrainTicketApp;
