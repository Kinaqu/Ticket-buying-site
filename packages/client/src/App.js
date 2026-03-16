import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPage from './pages/Admin';
import MainPage from './pages/Main';
import AccessDeniedAdminPage from './pages/AccessDeniedAdmin';
import AccessDeniedUserPage from './pages/AccessDeniedUser';
import AirTicketsPage from './screens/Main/FlightTicketApp';
import BuslinesPage from './screens/Main/Buslines';
import LoginPage from './screens/Main/Login';
import ProfilePage from './screens/Main/Profile';
import SignUpPage from './screens/Main/SignUp';
import TrainTicketsPage from './screens/Main/TrainTicketApp';
import AdminLoginPage from './screens/Admin/AdminLogin';
import EditAirTicketsPage from './screens/Admin/EditAirlines/index';
import EditTrainlinesPage from './screens/Admin/EditTrainlines/index';
import EditPlanesPage from './screens/Admin/EditPlane';
import EditTrainsPage from './screens/Admin/EditTrain';
import { useAuthAdmin } from './components/AuthContextAdmin';
import { useAuthUser } from './components/AuthContextUser';

const PrivateRouteAdmin = ({ element }) => {
  const { isAuthenticatedAsAdmin } = useAuthAdmin();
  return isAuthenticatedAsAdmin() ? element : <Navigate to="/access-denied-admin" />;
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
          {/* Public routes */}
          <Route path="/"              element={<MainPage />} />
          <Route path="/login"         element={<LoginPage />} />
          <Route path="/signup"        element={<SignUpPage />} />
          <Route path="/admin"         element={<AdminPage />} />
          <Route path="/admin/login"   element={<AdminLoginPage />} />

          {/* Admin protected routes */}
          <Route path="/admin/edit_airtickets"   element={<PrivateRouteAdmin element={<EditAirTicketsPage />} />} />
          <Route path="/admin/edit_traintickets" element={<PrivateRouteAdmin element={<EditTrainlinesPage />} />} />
          <Route path="/admin/edit_planes"       element={<PrivateRouteAdmin element={<EditPlanesPage />} />} />
          <Route path="/admin/edit_trains"       element={<PrivateRouteAdmin element={<EditTrainsPage />} />} />

          {/* User protected routes */}
          <Route path="/airtickets"   element={<PrivateRouteUser element={<AirTicketsPage />} />} />
          <Route path="/buslines"     element={<PrivateRouteUser element={<BuslinesPage />} />} />
          <Route path="/profile"      element={<PrivateRouteUser element={<ProfilePage />} />} />
          <Route path="/traintickets" element={<PrivateRouteUser element={<TrainTicketsPage />} />} />

          {/* Access denied */}
          <Route path="/access-denied"       element={<AccessDeniedUserPage />} />
          <Route path="/access-denied-admin" element={<AccessDeniedAdminPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;