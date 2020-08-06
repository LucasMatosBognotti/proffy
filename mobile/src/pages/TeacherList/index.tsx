import React from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';

import styles from './styles';

const TeacherList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Proffs Disponiveis" />
    </View>
  );
}

export default TeacherList;
