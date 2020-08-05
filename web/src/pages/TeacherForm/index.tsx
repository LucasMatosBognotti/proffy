import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import { warningIcon } from '../../assets/images/icons';

import './styles.css';
import Select from '../../components/Select';

interface ScheduleItem {
  week_day: string;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setConst] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: '0', from: '', to: ''}
    ])
  }, [scheduleItems]);

  const setScheduleItemValue = useCallback((position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }, [scheduleItems]);

  const handleCreateClass = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    await api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro');
    });

  }, [avatar, bio, cost, history, name, scheduleItems, subject, whatsapp]);

  return (
    <div id="page-teacher-form" className="container">
      <Header 
        title="Que incrivel que voce quer dar aula." 
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input name="name" label="Nome Completo" value={name} onChange={(e) => {setName(e.target.value)}} />
            <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}}  />
            <Input name="whatsapp" type="text" label="Whatsapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}} />
            <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => {setBio(e.target.value)}} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select 
              name="subject"
              label="Materia"
              value={subject}
              onChange={(e) => {setSubject(e.target.value)}}
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
            <Input name="cost" label="Custo da sua aula por hora" value={cost} onChange={(e) => {setConst(e.target.value)}} />
          </fieldset>
          
          <fieldset>
            <legend>
              Horários sisponiveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horario
              </button>
            </legend>
            
            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  name="week_day"
                  label="Dia da Semana"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                <Input name="from" label="Das" type="time" value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                <Input name="to" label="Até" type="time" value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
              </div>
            ))}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>

    </div>
  );
};

export default TeacherForm;
