import React, { useCallback } from 'react';

import { whatsappIcon } from '../../assets/images/icons';

import './styles.css';
import api from '../../services/api';

interface TeacherItemProps {
  classe: {
    id: number;
    user_id: number;
    subject: string;
    cost: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
  }
}

const TeacherItem: React.FC<TeacherItemProps> = ({ classe }) => {
  const { id, user_id, subject, cost, name, avatar, whatsapp, bio } = classe;

  const createNewConnection = useCallback(() => {
    api.post('connections', { user_id })
  }, [user_id]);

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name}/>
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{`R$ ${cost},00`}</strong>
        </p>
        <a target="_blank" href={`https://wa.me/${whatsapp}`} onClick={createNewConnection} >
          <img src={whatsappIcon} alt="whats"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
