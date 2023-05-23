import * as React from 'react';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../../styles/style';
import {IP} from '../../../components/constant';

const { width } = Dimensions.get('window');

const upSignal = async () => {
  try {
    const response = await fetch(`${IP}/up`);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
    }
  };

const Button_up = () => {
  
  return (
    <Button
      icon={() => <MaterialCommunityIcons name="arrow-up-bold-box-outline" color="white" size={24} />}
      style={{
        borderRadius: 10,height: 50,flex: 1,marginHorizontal:10,
        width: width - 250,
        backgroundColor: '#333333', // Set the background color of the button
      }}
      mode="contained"
      contentStyle={{ justifyContent: 'center' }}
      labelStyle={{ color: 'white', fontSize: 12 }}
      onPress={() => upSignal().then(() => console.log('Up signal sent'))}
    >
      Up
    </Button>
  );
};

export { Button_up };