import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TicketEditForm from './FlightTicketEditForm';  

const FlightTicketList = ({ onTicketClick }) => {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingTicket, setEditingTicket] = useState(null);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredDepartureCities, setFilteredDepartureCities] = useState([]);
  const [filteredArrivalCities, setFilteredArrivalCities] = useState([]);

  const uniqueDepartureCountries = [...new Set(countries.map(country => country.Country))];
  const uniqueArrivalCountries = [...new Set(countries.map(country => country.Country))];

  const handleDeleteClick = async (ticketId) => {
    try {
      await axios.delete(`http://localhost:3001/api/admin/FlightTicket/${ticketId}`);
      fetchTickets(); // Обновляем список после удаления
    } catch (error) {
      console.error('Error deleting flight ticket:', error);
    }
  };

  const fetchTickets = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/FlightTicket');
      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flight tickets:', error);
      setLoading(false);
    }
  }, []);

  const delayedSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/admin/FlightTicket?search=${searchQuery}`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error searching flight tickets:', error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) {
      fetchTickets();
    } else {
      delayedSearch(searchQuery);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleUpdateClick = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/api/admin/FlightTicket/${editingTicket._id}`, {
        Plane: editingTicket.Plane,
        CountryDeparture: editingTicket.CountryDeparture,
        CountryArrival: editingTicket.CountryArrival,
        CityDeparture: editingTicket.CityDeparture,
        CityArrival: editingTicket.CityArrival,
        Price: editingTicket.Price,
        FlightNumber: editingTicket.FlightNumber,
        DepartureDateTime: editingTicket.DepartureDateTime,
        LandDateTime: editingTicket.LandDateTime,
      });

      setEditingTicket(null);
      fetchTickets();
    } catch (error) {
      console.error('Error updating flight ticket:', error);
    }
  };

  const handleCountryChange = (field, value, isDeparture) => {
    const filteredCities = cities.filter(city => city.Country === value);
    isDeparture ? setFilteredDepartureCities(filteredCities) : setFilteredArrivalCities(filteredCities);

    setEditingTicket({
      ...editingTicket,
      [field]: isDeparture ? value : editingTicket[field],
      [field === 'CountryDeparture' ? 'CityDeparture' : 'CityArrival']: '',
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axios.get('http://localhost:3001/api/countries');
        setCountries(countriesResponse.data);

        const citiesResponse = await axios.get('http://localhost:3001/api/cities');
        setCities(citiesResponse.data);

        fetchTickets();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Отправлять GET-запрос каждые 10 секунд
    const intervalId = setInterval(() => {
      fetchTickets();
    }, 10000);

    // Очистить интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [fetchTickets]);

  return (
    <div>
      <h2>Existing Tickets</h2>
  
      <div>
      <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Search by Plane" />
      <button onClick={handleSearch}>Search</button>
      </div>
  
      {loading ? (
        <p>Loading...</p>
      ) : tickets && tickets.length > 0 ? (
        tickets.map((ticket) => (
          <div key={ticket._id} onClick={() => onTicketClick(ticket)}>
            {editingTicket && editingTicket._id === ticket._id ? (
              <TicketEditForm
                ticket={editingTicket}
                onSave={handleUpdate}
                onCancel={() => setEditingTicket(null)}
                onCountryChange={(field, value, isDeparture) => handleCountryChange(field, value, isDeparture)}
                onCityChange={(field, value) => setEditingTicket({ ...editingTicket, [field]: value })}
                uniqueDepartureCountries={uniqueDepartureCountries}
                filteredDepartureCities={filteredDepartureCities}
                uniqueArrivalCountries={uniqueArrivalCountries}
                filteredArrivalCities={filteredArrivalCities}
              />
            ) : (
              <>
                <p>Plane: {ticket.Plane}</p>
                <p>Country Departure: {ticket.CountryDeparture}</p>
                <p>Country Arrival: {ticket.CountryArrival}</p>
                <p>City Departure: {ticket.CityDeparture}</p>
                <p>City Arrival: {ticket.CityArrival}</p>
                <p>Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ticket.Price)}</p>
                <p>Flight Number: {ticket.FlightNumber}</p>
                <p>Departure Date Time: {new Date(ticket.DepartureDateTime).toLocaleString()}</p>
                <p>Land Date Time: {new Date(ticket.LandDateTime).toLocaleString()}</p>
                <button onClick={() => handleUpdateClick(ticket)}>Update</button>
                <button onClick={() => handleDeleteClick(ticket._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No tickets found</p>
      )}
    </div>
  );
};

export default FlightTicketList;