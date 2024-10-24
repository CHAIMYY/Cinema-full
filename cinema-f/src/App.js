import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Movies from './Pages/Movies'
import Details from './Pages/Details'
import Dashboard from './Pages/admin/dashboard'
import Amovies from './Pages/admin/Amovies'
import Stats from './Pages/admin/Stats'
import MovieCreate from './Pages/admin/MovieCreate'
import Admin from './Pages/admin/Admin'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

// import Users from './pages/admin/Users';
// import CinemaPage from './pages/CinemaPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/details" element={<Details />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Amovies" element={<Amovies />} />
      <Route path="/Stats" element={<Stats />} />
      <Route path="/MovieCreate" element={<MovieCreate />} />
      <Route path="/admins" element={<Admin />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
