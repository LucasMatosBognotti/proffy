import React, { useState, useCallback, FormEvent } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TeacherItem from '../../components/TeacherItem';

import './styles.css';

interface Teachers {
  id: number;
  user_id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

const TeacherList: React.FC = () => {
  const [classes, setClasses] = useState<Teachers[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const searchTeachers = useCallback((e: FormEvent) => {
    e.preventDefault();

    api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    }).then(response => {
      setClasses(response.data.classes);
    });
  }, [subject, time, week_day]);

  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os proffys disponiveis.">
        <form id="search-teachers" onSubmit={searchTeachers} >
          <Select 
            name="subject"
            label="Materia"
            value={subject}
            onChange={e => {setSubject(e.target.value)}}
            options={[
              { value: 'Portugues', label: 'Portugues' },
              { value: 'Matematica', label: 'Matematica' },
              { value: 'Historia', label: 'Historia' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Fisica', label: 'Fisica' },
              { value: 'Quimica', label: 'Quimica' },
              { value: 'Educação fisica', label: 'Educação fisica' },
              { value: 'Ingles', label: 'Ingles' },
              { value: 'Artes', label: 'Artes' },
            ]}
          />
          
          <Select 
            name="week_day"
            label="Dia da Semana"
            value={week_day}
            onChange={e => {setWeekDay(e.target.value)}}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-Feira' },
              { value: '2', label: 'Terça-Feira' },
              { value: '3', label: 'Quarta-Feira' },
              { value: '4', label: 'Quinta-Feira' },
              { value: '5', label: 'Sexta-Feira' },
              { value: '6', label: 'Sabado' },
            ]}
          />
          
          <Input name="time" type="time" label="Hora" value={time} onChange={e => {setTime(e.target.value)}} />
        
          <button type="submit">Buscar</button>
        </form>
      </Header>

      <main>
        {classes.map(classe => (
          <TeacherItem key={classe.id} classe={classe} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
