import React from 'react';
import { useLocation } from 'react-router-dom';
import NavButton from './NavButton';
import './css/Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="Navbar">
      <NavButton path="/" pathname="Home page" location={location.pathname} />
      <NavButton path="/issues" pathname="Issues" location={location.pathname} />
      <NavButton path="/branches" pathname="Commits" location={location.pathname} />
    </div>
  );
}
