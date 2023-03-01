import React from 'react';
import logo from '../images/star-wars-logo.png';

export default function Header() {
  return (
    <header>
      <img src={ logo } alt="Star wars logo" className="logo-img" />
      <p>PLANET SEARCH</p>
    </header>
  );
}
