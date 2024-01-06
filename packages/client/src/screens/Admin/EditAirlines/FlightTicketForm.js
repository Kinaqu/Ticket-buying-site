import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightTicketForm = ({ onAddTicket }) => {
  const [newTicket, setNewTicket] = useState({
    Plane: '',
    CountryDeparture: '',
    CountryArrival: '',
    CityDeparture: '',
    CityArrival: '',
    Price: 100000,
    FlightNumber: '00000',
    DepartureDateTime: new Date(),
    LandDateTime: new Date(),
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const uniqueDepartureCountries = [...new Set(countries.map(country => country.Country))];
  const uniqueArrivalCountries = [...new Set(countries.map(country => country.Country))];
  const [filteredDepartureCities, setFilteredDepartureCities] = useState([]);
  const [filteredArrivalCities, setFilteredArrivalCities] = useState([]);


  useEffect(() => {
    // Load countries and cities on component mount
    const fetchData = async () => {
      try {
        const countriesResponse = await axios.get('http://localhost:3001/api/countries');
        setCountries(countriesResponse.data);

        const citiesResponse = await axios.get('http://localhost:3001/api/cities');
        setCities(citiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCountryDepartureChange = (selectedCountry) => {
    const filteredCities = cities.filter(city => city.Country === selectedCountry);
    setFilteredDepartureCities(filteredCities);

    setNewTicket({
      ...newTicket,
      CountryDeparture: selectedCountry,
      // Устанавливайте значение по умолчанию, если CountryArrival пусто
      CountryArrival: newTicket.CountryArrival || selectedCountry,
      CityDeparture: '',
    });
  };

  const handleCountryArrivalChange = (selectedCountry) => {
    const filteredCities = cities.filter(city => city.Country === selectedCountry);
    setFilteredArrivalCities(filteredCities);

    setNewTicket({
      ...newTicket,
      CountryArrival: selectedCountry,
      // Устанавливайте значение по умолчанию, если CountryDeparture пусто
      CountryDeparture: newTicket.CountryDeparture || selectedCountry,
      CityArrival: '',
    });
  };

  const addTicket = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/admin/FlightTicket', newTicket);
      onAddTicket(response.data);

      // Reset form fields
      setNewTicket({
        Plane: '',
        CountryDeparture: '',
        CountryArrival: '',
        CityDeparture: '',
        CityArrival: '',
        Price: 100000,
        FlightNumber: '00000',
        DepartureDateTime: new Date(),
        LandDateTime: new Date(),
      });
    } catch (error) {
      console.error('Error adding new ticket:', error);
    }
  };
  return (
    <div>
      <h2>Add New Ticket</h2>
      <form>
        <label>
          Plane:
          <input
            type="text"
            value={newTicket.Plane}
            onChange={(e) => setNewTicket({ ...newTicket, Plane: e.target.value })}
          />
        </label>

        <label>
          Country Departure:
          <select
            value={newTicket.CountryDeparture}
            onChange={(e) => handleCountryDepartureChange(e.target.value)}
          >
            <option value="" disabled>Select Country</option>
            {uniqueDepartureCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label>
          City Departure:
          <select
            value={newTicket.CityDeparture}
            onChange={(e) => setNewTicket({ ...newTicket, CityDeparture: e.target.value })}
          >
            <option value="" disabled>Select City</option>
            {filteredDepartureCities.map((city) => (
              <option key={city._id} value={city.CityName}>
                {city.CityName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Country Arrival:
          <select
            value={newTicket.CountryArrival}
            onChange={(e) => handleCountryArrivalChange(e.target.value)}
          >
            <option value="" disabled>Select Country</option>
            {uniqueArrivalCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>



        <label>
          City Arrival:
          <select
            value={newTicket.CityArrival}
            onChange={(e) => setNewTicket({ ...newTicket, CityArrival: e.target.value })}
          >
            <option value="" disabled>Select City</option>
            {filteredArrivalCities.map((city) => (
              <option key={city._id} value={city.CityName}>
                {city.CityName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Price:
          <input
            type="number"
            value={newTicket.Price}
            onChange={(e) => setNewTicket({ ...newTicket, Price: e.target.value })}
          />
        </label>

        <label>
          Flight Number:
          <input
            type="text"
            value={newTicket.FlightNumber}
            onChange={(e) => setNewTicket({ ...newTicket, FlightNumber: e.target.value })}
          />
        </label>

        <label>
          Departure Date and Time:
          <input
            type="datetime-local"
            value={newTicket.DepartureDateTime.toISOString().slice(0, 16)}
            onChange={(e) => setNewTicket({ ...newTicket, DepartureDateTime: new Date(e.target.value) })}
          />
        </label>

        <label>
          Land Date and Time:
          <input
            type="datetime-local"
            value={newTicket.LandDateTime.toISOString().slice(0, 16)}
            onChange={(e) => setNewTicket({ ...newTicket, LandDateTime: new Date(e.target.value) })}
          />
        </label>

        <button type="button" onClick={addTicket}>
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export default FlightTicketForm;