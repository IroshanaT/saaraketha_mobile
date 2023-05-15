import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/style';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const AppBar = () => {
  const _handleMore = () => console.log('Shown more');

  return (
      <LinearGradient colors={['#5EBC00', '#BBFF4D']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
        <Appbar.Header style={{backgroundColor: 'transparent'}}>
          <View style={styles.avatarContainer}>
            <Avatar.Text size={35} label="XD" />
          </View>
          <Appbar.Content title="Ravindu" />
          <Appbar.Action icon="menu" onPress={_handleMore} />
        </Appbar.Header>
      </LinearGradient>
  );
};

export { AppBar };