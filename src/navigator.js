import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Avatar } from "react-native-elements";
import { AuthContext } from "./contexts/auth";

import LoginScreen from "./screens/auth/login";
import RegScreen from "./screens/auth/reg";
import LandingScreen from "./screens/start/landing";
import Home from "./screens/home/home";
//Screen names
const login = "Login";
const reg = "Register";
const landing = 'Landing';
const home = 'Home';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();






export default function MainContainer() {

  const [pic, setPic] = useState();
    const { uPic } = useContext(AuthContext);
    
  useEffect(() => {
      console.log(uPic);
      setPic(uPic)
  }, [uPic]);



  function Main() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name={home} component={Home} options={({ navigation }) => ({ headerStyle: {
          backgroundColor: '#96E42E'
        },
          headerTitle: (props) =>{} , headerRight: () => <Avatar source={{ uri:pic ? pic : "https://picsum.photos/seed/picsum/200/300"}} rounded size={40}/>,headerRightContainerStyle:{marginRight:2}
  })}/>
      </Drawer.Navigator>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={landing} component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name={login} component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name={reg} component={RegScreen} options={{ headerShown: false }} />
        <Stack.Screen name={"Main"} component={Main}  options={{ headerShown: false }} />
      </Stack.Navigator>
    
    </NavigationContainer>
    
  );
}