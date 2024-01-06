import React from 'react';

const TrainTicketInfo = ({ ticket, onEditClick, onDeleteClick }) => (
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
    <button onClick={() => onEditClick(ticket)}>Edit</button>
    <button onClick={() => onDeleteClick(ticket._id)}>Delete</button>
  </>
);

export default TrainTicketInfo;
