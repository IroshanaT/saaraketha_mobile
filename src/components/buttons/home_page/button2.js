import * as React from 'react';
import { Dimensions } from 'react-native'; // Import Dimensions from react-native
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons
import { styles } from '../../../styles/style';

const { width } = Dimensions.get('window');

const Button2 = () => {
    return (
      <LinearGradient
        colors={['#5EBC00', '#BBFF4D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 10 }}
      >
        <Button 
          icon={() => <MaterialCommunityIcons name="image" color="black" size={24} />} 
          style={{...styles.button_style, width: width - 40}} // Set width to device width
          mode="contained"
          contentStyle={{ justifyContent: 'flex-start' }} // Align content to the left
          labelStyle={{color: 'black'}} // Change text color
          onPress={() => console.log('Button pressed')}
        >
          Upload Image
        </Button>
      </LinearGradient>
    );
  };

  export { Button2 };