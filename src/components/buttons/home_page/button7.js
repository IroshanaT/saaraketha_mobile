import * as React from 'react';
import { Dimensions } from 'react-native'; // Import Dimensions from react-native
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons
import { styles } from '../../../styles/style';

const { width } = Dimensions.get('window');

const Button7 = () => {
    return (
      <LinearGradient
        colors={['#5EBC00', '#BBFF4D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 10,height: 50,flex: 1,marginHorizontal:10}}
      >
        <Button 
         icon={() => <MaterialCommunityIcons name="camera-plus-outline" color="black" size={24} />} 
          style={{...styles.text_btn_style, width: width - 250, }} // Set width to device width
          mode="contained"
          contentStyle={{ justifyContent: 'center' }} // Align content to the left
          labelStyle={{color: 'black', fontSize: 12}} // Change text color
          onPress={() => console.log('Button pressed')}
        >
          Capture Image
        </Button>
      </LinearGradient>
    );
  };

  export { Button7 };