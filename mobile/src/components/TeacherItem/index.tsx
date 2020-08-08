import React, { useCallback, useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { heartOutline, unfavorite, whatsapp } from '../../assets/icons';

import styles from './styles';

interface TeacherItemPros {
  id: number;
  subject: string;
  cost: number;
  user_id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface Teacher {
  classe: TeacherItemPros;
  favorited: boolean;
}

const TeacherItem: React.FC<Teacher> = ({ classe, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsapp = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=${classe.whatsapp}`);
  }, []);

  async function hadleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: TeacherItemPros) => {
        return teacherItem.id === classe.id 
      });

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorited(false);
    } else {
      favoritesArray.push(classe);

      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: classe.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{classe.name}</Text>
          <Text style={styles.subject}>{classe.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{classe.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {' '}
          <Text style={styles.priceValue}>{`R$ ${classe.cost},00`}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={hadleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {}
            ]}>
            { isFavorited 
              ? <Image source={unfavorite}/>
              : <Image source={heartOutline} />
            }
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsapp} />
            <Text style={styles.contactButtonText} >Entrar em contato</Text>
          </RectButton>          
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;
