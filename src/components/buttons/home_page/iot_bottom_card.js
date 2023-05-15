import * as React from 'react';
import { Dimensions, View } from 'react-native'; // Import Dimensions from react-native
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons
import { styles } from '../../../styles/style';
import { Button6 } from './button6';
import { Button7 } from './button7';
import { Button_up } from './button_up';
import { Button_down } from './button_down';

const { width } = Dimensions.get('window');

const Iot_bottom_card = () => {
    return (
        <Card>
      <Card.Actions style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button6/>
          <Button7/>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Button_up/>
        <Button_down/>
        </View>
      </Card.Actions>
    </Card>
    );
  };

  export { Iot_bottom_card };