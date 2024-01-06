import React from 'react';

const TrainTicketEditForm = ({
    ticket,
    onSave,
    onCancel,
    onCountryChange,
    onCityChange,
    uniqueDepartureCountries,
    filteredDepartureCities,
    uniqueArrivalCountries,
    filteredArrivalCities
  }) => (
    <div>
      <input
        type="text"
        value={ticket.Train}
        onChange={(e) => onCityChange('Train', e.target.value)}
      />
      <select
        value={ticket.CountryDeparture}
        onChange={(e) => onCountryChange('CountryDeparture', e.target.value, true)}
      >
        <option value="" disabled>Select Country</option>
        {uniqueDepartureCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        value={ticket.CityDeparture}
        onChange={(e) => onCityChange('CityDeparture', e.target.value)}
      >
        <option value="" disabled>Select City</option>
        {filteredDepartureCities && filteredDepartureCities.map((city) => (
          <option key={city._id} value={city.CityName}>
            {city.CityName}
          </option>
        ))}
      </select>
      <select
        value={ticket.CountryArrival}
        onChange={(e) => onCountryChange('CountryArrival', e.target.value, false)}
      >
        <option value="" disabled>Select Country</option>
        {uniqueArrivalCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        value={ticket.CityArrival}
        onChange={(e) => onCityChange('CityArrival', e.target.value)}
      >
        <option value="" disabled>Select City</option>
        {filteredArrivalCities && filteredArrivalCities.map((city) => (
          <option key={city._id} value={city.CityName}>
            {city.CityName}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={ticket.Price}
        onChange={(e) => onCityChange('Price', e.target.value)}
        placeholder="Price"
      />
      <input
        type="text"
        value={ticket.TrainNumber}
        onChange={(e) => onCityChange('TrainNumber', e.target.value)}
        placeholder="Train Number"
      />
      <input
        type="datetime-local"
        value={ticket.DepartureDateTime}
        onChange={(e) => onCityChange('DepartureDateTime', e.target.value)}
        placeholder="Departure Date Time"
      />
      <input
        type="datetime-local"
        value={ticket.ArriveDateTime}
        onChange={(e) => onCityChange('ArriveDateTime', e.target.value)}
        placeholder="Arrive Date Time"
      />
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
export default TrainTicketEditForm;
