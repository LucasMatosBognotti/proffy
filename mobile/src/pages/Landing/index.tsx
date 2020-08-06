import React from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { landing } from '../../assets/images';
import { study, giveClasses, heart } from '../../assets/icons';

import styles from './styles';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={landing} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold} >O que deseja fazer ?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton 
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => navigate('Study')}  
        >
          <Image source={study} />

          <Text style={styles.buttonText} >Estudar</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigate('GiveClasses')}
        >
          <Image source={giveClasses} />

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections} >
        Total de 300 conexões já realizadas {' '}
        <Image source={heart} />
      </Text>
    </View>
  );
};

export default Landing;
