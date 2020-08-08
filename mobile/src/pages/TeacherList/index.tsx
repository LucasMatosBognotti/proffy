import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';

import styles from './styles';

interface TeacherListProps {
  id: number;
  subject: string;
  cost: number;
  user_id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  
  const [classes, setClasses] = useState<TeacherListProps[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function handleToggleFilterVisable() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: TeacherListProps) => {
          return teacher.id
        });

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  async function handleFilterSubmit() {
    loadFavorites();
    
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });
    
    setClasses(response.data.classes);
    setIsFiltersVisible(false);
  }

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Header
            title="Proffs Disponiveis"
            headerRight={(
              <BorderlessButton onPress={handleToggleFilterVisable} >
                <Feather name="filter" size={20} color="#FFF" />
              </BorderlessButton>
            )}
          >

            {isFiltersVisible && (
              <View style={styles.searchForm}>
                <Text style={styles.label}>Materia</Text>
                <TextInput
                  style={styles.input}
                  value={subject}
                  onChangeText={text => setSubject(text)}
                  placeholder="Qual a matéria?"
                  placeholderTextColor="#999"
                />

                <View style={styles.inputGroup}>
                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Dia da Semana</Text>
                    <TextInput
                      style={styles.input}
                      value={week_day}
                      onChangeText={text => setWeekDay(text)}
                      placeholder="Qual o dia?"
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Horario</Text>
                    <TextInput
                      style={styles.input}
                      value={time}
                      onChangeText={text => setTime(text)}
                      placeholder="Qual o horario?"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                <RectButton style={styles.submitButton} onPress={handleFilterSubmit} >
                  <Text style={styles.submitButtonText}>Filtrar</Text>
                </RectButton>
              </View>
            )}
          </Header>
        </View>

        <ScrollView
          style={styles.teacherItem}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}>
          {classes.map(classe => (
            <TeacherItem
              key={classe.id}
              classe={classe}
              favorited={favorites.includes(classe.id)}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </>
  );
}

export default TeacherList;
