import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPage from './pages/Admin';
import AirTicketsPage from './screens/Main/FlightTicketApp';
import BuslinesPage from './screens/Main/Buslines';
import LoginPage from './screens/Main/Login';
import ProfilePage from './screens/Main/Profile';
import SignUpPage from './screens/Main/SignUp';
import TrainTicketsPage from './screens/Main/TrainTicketApp';
import MainPage from './pages/Main';
import AdminLoginPage from './screens/Admin/AdminLogin';
import EditAirTicketsPage from './screens/Admin/EditAirlines/index';
import EditTrainlinesPage from './screens/Admin/EditTrainlines/index';
import EditPlanesPage from './screens/Admin/EditPlane';
import EditTrainsPage from './screens/Admin/EditTrain';
import {  useAuthAdmin } from './components/AuthContextAdmin';
import { useAuthUser } from './components/AuthContextUser';

const AccessDenied = () => (
  <div>
    <h1>Ошибка</h1>
    <p>Вы не имеете доступа к странице. Пожалуйста, войдите в аккаунт.</p>
  </div>
);

const PrivateRouteAdmin = ({ element }) => {
  const { isAuthenticatedAsAdmin } = useAuthAdmin();
  return isAuthenticatedAsAdmin() ? element : <Navigate to="/access-denied" />;
};

const PrivateRouteUser = ({ element }) => {
  const { isAuthenticatedAsUser } = useAuthUser();
  return isAuthenticatedAsUser() ? element : <Navigate to="/access-denied" />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Other non-protected routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage />} />

          {/* Admin protected routes */}
          <Route exact path="/admin/edit_airtickets" element={<PrivateRouteAdmin element={<EditAirTicketsPage />} />} />
          <Route exact path="/admin/edit_traintickets" element={<PrivateRouteAdmin element={<EditTrainlinesPage />} />} />
          <Route exact path="/admin/edit_planes" element={<PrivateRouteAdmin element={<EditPlanesPage />} />} />
          <Route exact path="/admin/edit_trains" element={<PrivateRouteAdmin element={<EditTrainsPage />} />} />

          {/* User protected routes */}
          <Route exact path="/airtickets" element={<PrivateRouteUser element={<AirTicketsPage />} />} />
          <Route exact path="/buslines" element={<PrivateRouteUser element={<BuslinesPage />} />} />
          <Route exact path="/profile" element={<PrivateRouteUser element={<ProfilePage />} />} />
          <Route exact path="/traintickets" element={<PrivateRouteUser element={<TrainTicketsPage />} />} />

          {/* Access denied route */}
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
