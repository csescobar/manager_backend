import React from 'react';
//import { Link } from 'react-router-dom';

//import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';

const PageHeader = () => {
  return (
    <header className="page-header">
      <div className="header-content">
        <strong>Church Manager</strong>
        <p>Sistema de gerenciamento de Igrejas</p>
      </div>
    </header>
  );
};

export default PageHeader;
