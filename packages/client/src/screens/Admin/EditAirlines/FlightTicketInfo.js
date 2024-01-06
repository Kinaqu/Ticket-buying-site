import React from 'react';

const TicketInfo = ({ ticket, onEditClick }) => (
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
    <button onClick={() => onEditClick(ticket)}>Edit</button>
    <button onClick={() => handleDeleteClick(ticket._id)}>Delete</button>
  </>
);

export default TicketInfo;