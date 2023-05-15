import * as React from 'react';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../../styles/style';

const { width } = Dimensions.get('window');

const Button_down = () => {
  return (
    <Button
      icon={() => <MaterialCommunityIcons name="arrow-down-bold-box-outline" color="white" size={24} />}
      style={{
        borderRadius: 10,height: 50,flex: 1,marginHorizontal:10,
        width: width - 250,
        backgroundColor: '#333333', // Set the background color of the button
      }}
      mode="contained"
      contentStyle={{ justifyContent: 'center' }}
      labelStyle={{ color: 'white', fontSize: 12 }}
      onPress={() => console.log('Button pressed')}
    >
      Down
    </Button>
  );
};

export { Button_down };