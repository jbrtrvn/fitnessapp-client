import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Login from './pages/Login';
import Register from './pages/Register';
import Workouts from './pages/Workouts';
import AppNavbar from './components/AppNavbar';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Container>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;