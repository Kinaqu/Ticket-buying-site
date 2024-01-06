import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const BuslinesPage = () => {
  const [buslines, setBuslines] = useState([]);

  useEffect(() => {
    // Запрос на сервер для получения данных
    axios.get('/api/getBuslines')
      .then(response => setBuslines(response.data))
      .catch(error => console.error(error));
  }, []);

  return (

    <div>
      <div><Navbar/></div>
      <h2>Список автобусных маршрутов</h2>
      <ul>
        {buslines.map(busline => (
          <li key={busline.id}>{busline.name}</li>
        ))}
      </ul>
      <div><Footer/></div>
    </div>

  );
};

export default BuslinesPage;