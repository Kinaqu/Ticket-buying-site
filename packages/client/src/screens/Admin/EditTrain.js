import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';

const TrainTicketItem = ({ train, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [newTrain, setNewTrain] = useState('');

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleNewTrainChange = (event) => {
    setNewTrain(event.target.value);
  };

  const handleUpdateTrain = () => {
    onUpdate(train, newTrain);
    setNewTrain('');
    handleToggleDetails();
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px', textAlign: 'center' }}>
      <div>{train}</div>
      {showDetails && (
        <div>
          <label>New Train:</label>
          <input type="text" value={newTrain} onChange={handleNewTrainChange} />
          <button onClick={handleUpdateTrain}>Update Train</button>
        </div>
      )}
      <button onClick={handleToggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

const EditTrainsPage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/admin/trains')
      .then(response => setTrains(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleUpdateTrain = (oldTrain, newTrain) => {
    axios.put(`http://localhost:3001/api/admin/trains/${oldTrain}`, { newTrain, oldTrain })
      .then(response => {
        console.log(response.data.message);
        return axios.get('http://localhost:3001/api/admin/trains');
      })
      .then(response => setTrains(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <div><AdminNavbar /></div>
      <h1>Trains</h1>
      {trains.map(train => (
        <TrainTicketItem key={train} train={train} onUpdate={handleUpdateTrain} />
      ))}
      <div><Footer /></div>
    </div>
  );
};

export default EditTrainsPage;