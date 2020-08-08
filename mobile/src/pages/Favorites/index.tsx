import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';

import styles from './styles';

interface FavoritesProps {
  id: number;
  subject: string;
  cost: number;
  user_id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoritesProps[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <Header title="Meus proffs favoritos" />

      <ScrollView
        style={styles.teacherItem}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map(teacher => (
          <TeacherItem key={teacher.id} classe={teacher} favorited={true} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;
