import React from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { logo } from '../../assets/images';
import { back } from '../../assets/icons';

import styles from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.toBar}>
        <BorderlessButton onPress={() => navigate('Landing')}>
          <Image source={back} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logo} resizeMode="contain" />
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
