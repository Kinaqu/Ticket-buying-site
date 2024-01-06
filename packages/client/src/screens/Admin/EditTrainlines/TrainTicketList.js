import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TicketEditForm from './TrainTicketEditForm';

const TrainTicketList = ({ onTicketClick }) => {
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
      await axios.delete(`http://localhost:3001/api/admin/TrainTicket/${ticketId}`);
      fetchTickets(); // Обновляем список после удаления
    } catch (error) {
      console.error('Error deleting train ticket:', error);
    }
  };

  const fetchTickets = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/TrainTicket');
      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching train tickets:', error);
      setLoading(false);
    }
  }, []);

  const delayedSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/admin/TrainTicket?search=${searchQuery}`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error searching train tickets:', error);
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
      await axios.put(`http://localhost:3001/api/admin/TrainTicket/${editingTicket._id}`, {
        Train: editingTicket.Train,
        CountryDeparture: editingTicket.CountryDeparture,
        CountryArrival: editingTicket.CountryArrival,
        CityDeparture: editingTicket.CityDeparture,
        CityArrival: editingTicket.CityArrival,
        Price: editingTicket.Price,
        TrainNumber: editingTicket.TrainNumber,
        DepartureDateTime: editingTicket.DepartureDateTime,
        ArriveDateTime: editingTicket.ArriveDateTime,
      });

      setEditingTicket(null);
      fetchTickets();
    } catch (error) {
      console.error('Error updating train ticket:', error);
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

    
    const intervalId = setInterval(() => {
      fetchTickets();
    }, 10000);

    // Очистить интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [fetchTickets]);

  return (
    <div>
      <h2>Existing Train Tickets</h2>

      <div>
        <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Search by Train" />
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
                <p>Train: {ticket.Train}</p>
                <p>Country Departure: {ticket.CountryDeparture}</p>
                <p>Country Arrival: {ticket.CountryArrival}</p>
                <p>City Departure: {ticket.CityDeparture}</p>
                <p>City Arrival: {ticket.CityArrival}</p>
                <p>Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ticket.Price)}</p>
                <p>Train Number: {ticket.TrainNumber}</p>
                <p>Departure Date Time: {new Date(ticket.DepartureDateTime).toLocaleString()}</p>
                <p>Arrive Date Time: {new Date(ticket.ArriveDateTime).toLocaleString()}</p>
                <button onClick={() => handleUpdateClick(ticket)}>Update</button>
                <button onClick={() => handleDeleteClick(ticket._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No train tickets found</p>
      )}
    </div>
  );
};

export default TrainTicketList;