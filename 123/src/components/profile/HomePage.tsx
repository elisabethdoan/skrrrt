import React from 'react';
import Navbar from '../navbar/Navbar';
import Profile from './Profile';
import './css/HomePage.css';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div id="homePage">
        <h1 style={{ textAlign: 'center' }}>Home page</h1>
        <p style={{ textAlign: 'center' }}>
          Velkommen til prosjektet vårt!
          <br />
          For å se på issues kan du trykke på Issues i navigasjonsbaren.
          <br />
          For å se på commits og barnches kan du trykke på Commits i
          navigasjonsbaren.
        </p>
        <Profile />
      </div>
    </div>
  );
}

export default HomePage;
