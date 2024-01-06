import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';

// Новый компонент PlaneItem
const PlaneItem = ({ plane, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [newPlane, setNewPlane] = useState('');

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleNewPlaneChange = (event) => {
    setNewPlane(event.target.value);
  };

  const handleUpdatePlane = () => {
    onUpdate(plane, newPlane);
    setNewPlane('');
    handleToggleDetails();
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px', textAlign: 'center' }}>
      <div>{plane}</div>
      {showDetails && (
        <div>
          <label>New Plane:</label>
          <input type="text" value={newPlane} onChange={handleNewPlaneChange} />
          <button onClick={handleUpdatePlane}>Update Plane</button>
        </div>
      )}
      <button onClick={handleToggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

const EditPlanesPage = () => {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    // Получить уникальные значения Plane при загрузке компонента
    axios.get('http://localhost:3001/api/admin/flights')
      .then(response => setPlanes(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleUpdatePlane = (oldPlane, newPlane) => {
    // Отправить PUT запрос для обновления значения Plane
    axios.put(`http://localhost:3001/api/admin/flights/${oldPlane}`, { newPlane, oldPlane }) // Добавлено oldPlane
      .then(response => {
        console.log(response.data.message);
        // Повторно запросить уникальные значения Plane после обновления
        return axios.get('http://localhost:3001/api/admin/flights');
      })
      .then(response => setPlanes(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <div><AdminNavbar/></div>
      <h1>Planes</h1>
      {planes.map(plane => (
        <PlaneItem key={plane} plane={plane} onUpdate={handleUpdatePlane} />
      ))}
      <div><Footer/></div>
    </div>
  );
};

export default EditPlanesPage;