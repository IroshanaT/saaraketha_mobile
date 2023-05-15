import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    avatarContainer: {
    marginRight: 10,
    marginLeft: 10,
    },
    margine_container: {
      marginRight: 20,
      marginLeft: 20,
    },
    bottomNav: {
        height: 50,  // Change this value to adjust the height
    },
    btm_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      bottomNav: {
        height: 58,  // Change this value to adjust the height
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      view_container: {
        flex: 1,
        flexDirection: "column"
      },
      button_style: {
        backgroundColor: 'transparent',
        paddingTop: 10,
        paddingBottom: 10,
      },
      text_btn_style:{
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
      }
});

export const GradientBackground = ({ children }) => (
    <LinearGradient colors={['#5EBC00', '#BBFF4D']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
      {children}
    </LinearGradient>
  );