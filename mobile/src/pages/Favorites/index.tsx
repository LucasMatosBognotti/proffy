import React from 'react';
import { View } from 'react-native';

import Header from '../../components/Header';

import styles from './styles';

const Favorites: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Meus proffs favoritos" />
    </View>
  );
}

export default Favorites;
