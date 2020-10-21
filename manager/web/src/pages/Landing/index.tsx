import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <strong>Church Manager</strong>
          <p>Sistema de gerenciamento de Igrejas</p>
        </div>
        <div className="buttons-container">
          <Link to='/login' >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;