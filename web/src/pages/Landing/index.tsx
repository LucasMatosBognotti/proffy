import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { logoImg, landingImg } from '../../assets/images';
import { studyIcon, giveClassesIcon, purpleHeartIcon } from '../../assets/images/icons';

import './styles.css';
import api from '../../services/api';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua Plataforma de estudos online.</h2>
        </div>

        <img src={landingImg} alt="Plataforma de estudos" className="hero-image" />
      
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar Aulas" />
            Dar Aulas
          </Link>
        </div>

        <span className="total-connections">
          {`Total de ${totalConnections} conexões`}
          <img src={purpleHeartIcon} alt="Coração roxo"/>
        </span>
      </div>
    </div>
  );
};

export default Landing;