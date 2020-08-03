import React from 'react';

import { whatsappIcon } from '../../assets/images/icons';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://api.adorable.io/avatars/121/abott@adorable.png" alt="Lucas"/>
        <div>
          <strong>Lucas Matos</strong>
          <span>Quimica</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de quimica avançada.
        <br />
        Apaixonado por explodir coisas em laboratório e por mudar a vidas das pessoas atraves de experiencias.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80.00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="whats"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
