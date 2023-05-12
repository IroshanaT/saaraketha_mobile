import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Avatar } from "react-native-elements";
import { AuthContext } from "./contexts/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./screens/auth/login";
import RegScreen from "./screens/auth/reg";
import LandingScreen from "./screens/start/landing";
import Home from "./screens/home/home";
import Detection from "./screens/home/detection";
import Upload from "./screens/upload/imageHome";
import Aerial from "./screens/upload/aerial";
import NonAerial from "./screens/upload/nonaerial";
import Save from "./screens/upload/save";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const [pic, setPic] = useState();
  const { uPic } = useContext(AuthContext);

  useEffect(() => {
    setPic(uPic);
  }, [uPic]);

  function Bottem() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "black",
            height: 55,
          },

          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Settings") {
              iconName = "bar-chart";
            } else if (route.name === "Detection") {
              iconName = "md-scan-circle";
            } else if (route.name === "dd") {
              iconName = "leaf";
            } else if (route.name === "ee") {
              iconName = "people-circle";
            }

            return <Ionicons name={iconName} size={32} color={color} />;
          },
          tabBarActiveTintColor: "#86cc29",
          tabBarInactiveTintColor: "black",
        })}
      >
        <Tab.Screen
          name={"Home"}
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={"Settings"}
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={"Detection"}
          component={Detection}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={"dd"}
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={"ee"}
          component={Home}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }

  function Main() {
    return (
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen
          name={"Main"}
          component={Bottem}
          options={({}) => ({
            headerStyle: { backgroundColor: "#96E42E" },
            headerTitle: () => {},
            headerRight: () =>
              pic ? (
                <Avatar
                  source={{
                    uri: pic,
                  }}
                  rounded
                  size={40}
                />
              ) : (
                <Avatar
                  source={require("../assets/profile.png")}
                  rounded
                  size={40}
                />
              ),
            headerRightContainerStyle: { marginRight: 2 },
          })}
        />

        <Drawer.Screen
          name={"Upload"}
          component={Upload}
          options={({}) => ({
            headerStyle: { backgroundColor: "#96E42E" },
            headerTitle: () => {},
            headerRight: () =>
              pic ? (
                <Avatar
                  source={{
                    uri: pic,
                  }}
                  rounded
                  size={40}
                />
              ) : (
                <Avatar
                  source={require("../assets/profile.png")}
                  rounded
                  size={40}
                />
              ),
            headerRightContainerStyle: { marginRight: 2 },
          })}
        />
        <Drawer.Screen
          name={"Aerial"}
          component={Aerial}
          options={({}) => ({
            headerStyle: { backgroundColor: "#96E42E" },
            headerTitle: () => {},
            headerRight: () =>
              pic ? (
                <Avatar
                  source={{
                    uri: pic,
                  }}
                  rounded
                  size={40}
                />
              ) : (
                <Avatar
                  source={require("../assets/profile.png")}
                  rounded
                  size={40}
                />
              ),
            headerRightContainerStyle: { marginRight: 2 },
          })}
        />
        <Drawer.Screen
          name={"NonAerial"}
          component={NonAerial}
          options={({}) => ({
            headerStyle: { backgroundColor: "#96E42E" },
            headerTitle: () => {},
            headerRight: () =>
              pic ? (
                <Avatar
                  source={{
                    uri: pic,
                  }}
                  rounded
                  size={40}
                />
              ) : (
                <Avatar
                  source={require("../assets/profile.png")}
                  rounded
                  size={40}
                />
              ),
            headerRightContainerStyle: { marginRight: 2 },
          })}
        />
         <Drawer.Screen
          name={"Save"}
          component={Save}
          options={({}) => ({
            headerStyle: { backgroundColor: "#96E42E" },
            headerTitle: () => {},
            headerRight: () =>
              pic ? (
                <Avatar
                  source={{
                    uri: pic,
                  }}
                  rounded
                  size={40}
                />
              ) : (
                <Avatar
                  source={require("../assets/profile.png")}
                  rounded
                  size={40}
                />
              ),
            headerRightContainerStyle: { marginRight: 2 },
          })}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"Landing"}
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Login"}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Register"}
          component={RegScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Initial"}
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
