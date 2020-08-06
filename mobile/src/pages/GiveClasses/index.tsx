import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { giveClassesBackground } from '../../assets/images';

import styles from './styles';

const GiveClasses: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode="contain"
        source={giveClassesBackground}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proff?</Text>
        <Text style={styles.description}>
          Para começar, voce precisa se cadastrar como um professor na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton style={styles.okButton} onPress={() => navigate('Landing')} >
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
