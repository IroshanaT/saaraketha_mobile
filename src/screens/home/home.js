import React ,{ useContext, useEffect, useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import { FontFamily, FontSize, Color, Border } from "../../../GlobalStyles";

const Home = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/bg3.png")}
      style={styles.landing}
    >
      <ScrollView>
      <View style={styles.container}>
      <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 18, fontFamily: FontFamily.urbanistSemibold }}>
          DashBoard
        </Text>
      </View>
      <View style={[styles.group]}>
        <TouchableOpacity onPress={() => navigation.navigate("Detection")}>
          <LinearGradient
            style={[styles.groupChild, styles.groupParentLayout]}
            locations={[0, 1]}
            colors={["#5ebc00", "#bbff4d"]}
          />
          <Image
            style={[styles.groupItem, styles.groupPosition]}
            resizeMode="cover"
            source={require("../../../assets/g3.png")}
          />
          <Text style={[styles.diseaseDetection, styles.ravinduTypo]}>
            Disease Detection
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.groupView]}
          onPress={() => navigation.navigate("Map",{status:'Initial',IntialData:null})}
        >
          <LinearGradient
            style={[styles.groupChild, styles.groupParentLayout]}
            locations={[0, 1]}
            colors={["#5ebc00", "#bbff4d"]}
          />
          <Image
            style={[styles.groupItem, styles.groupPosition]}
            resizeMode="cover"
            source={require("../../../assets/g4.png")}
          />
          <Text style={[styles.diseaseDetection, styles.ravinduTypo]}>
            Location Tracker
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.groupView]}
          onPress={() => navigation.navigate("Recomendation")}
        >
          <LinearGradient
            style={[styles.groupChild, styles.groupParentLayout]}
            locations={[0, 1]}
            colors={["#5ebc00", "#bbff4d"]}
          />
          <Image
            style={[styles.groupItem, styles.groupPosition]}
            resizeMode="cover"
            source={require("../../../assets/g2.png")}
          />
          <Text style={[styles.diseaseDetection, styles.ravinduTypo]}>
            Rice Variety Selection
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.groupView]}
          onPress={() => navigation.navigate("Home")}
        >
          <LinearGradient
            style={[styles.groupChild, styles.groupParentLayout]}
            locations={[0, 1]}
            colors={["#5ebc00", "#bbff4d"]}
          />
          <Image
            style={[styles.groupItem, styles.groupPosition]}
            resizeMode="cover"
            source={require("../../../assets/g1.png")}
          />
          <Text style={[styles.diseaseDetection, styles.ravinduTypo]}>
            Crowd Source
          </Text>
        </TouchableOpacity>

        <View style={[styles.featuredTag, styles.tagLayout]}>
          <View style={styles.rectangleViewShadowBox} />
          <Text style={[styles.key, styles.keyTypo]}>What’s New</Text>
          <Text style={[styles.key1, styles.keyPosition]}>
            View Saaraketha's upcoming exciting features!
          </Text>
          <View style={[styles.featuredTagItem, styles.groupChild2Layout]} />
          <Text style={[styles.text, styles.keyTypo]}>⚡️</Text>
        </View>

        <View style={[styles.featuredTag, styles.tagLayout, styles.mg]}>
          <View style={styles.rectangleViewShadowBox} />
          <Text style={[styles.key, styles.keyTypo]}>Upgrade to pro</Text>
          <Text style={[styles.key1, styles.keyPosition]}>
            Experience Saaraketha's premium features!
          </Text>
          <View style={[styles.rectangleParent3, styles.groupChild2Layout]}>
            <LinearGradient
              style={[styles.groupChild2, styles.groupChild2Layout]}
              locations={[0.01, 1]}
              colors={["#5ebc00", "#bbff4d"]}
            />
            <Image
              style={{ width: 20, height: 30, marginLeft: 5 }}
              resizeMode="cover"
              source={require("../../../assets/g5.png")}
            />
          </View>
        </View>
      </View>
      </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  landing: {
    backgroundColor: "#edebeb",
    flex: 1,
    width: "100%",
    overflow: "hidden",
    zIndex:-2,
  },
  container:{
    height:700,
    marginTop:10,
    paddingBottom:50,
    
  },
  ravinduTypo: {
    fontFamily: FontFamily.urbanistSemibold,
    fontWeight: "600",
    lineHeight: 24,
    fontSize: FontSize.size_mid,
    textAlign: "left",
    position: "absolute",
  },
  diseaseDetection: {
    top: 16,
    left: 87,
    width: 259,
    height: 25,
    textAlign: "left",
    color: Color.darkslategray_100,
  },
  groupPosition: {
    left: 29,
    top: 15,
    position: "absolute",
  },
  groupItem: {
    width: 28,
    height: 28,
  },
  groupChild: {
    backgroundColor: "transparent",
    borderRadius: Border.br_3xs,
    top: 0,
  },
  groupParentLayout: {
    height: 58,
    width: 346,
    left: 0,
    position: "absolute",
  },
  group: {
    marginLeft: 20,
    marginTop: 70,
    position: "absolute",
  },
  groupView: {
    marginTop: 75,
  },
  keyTypo: {
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontWeight: "600",
  },
  keyPosition: {
    left: 67,
    color: Color.darkslategray_100,
    position: "absolute",
  },
  key: {
    lineHeight: 18,
    left: 67,
    color: Color.darkslategray_100,
    position: "absolute",
    top: 23,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.urbanistSemibold,
  },
  key1: {
    top: 41,
    fontSize: FontSize.size_xs,
    lineHeight: 16,
    fontFamily: FontFamily.urbanistRegular,
    textAlign: "left",
  },
  featuredTag: {
    top: 321,
  },
  tagLayout: {
    height: 81,
    width: 346,
    left: 0,
    position: "absolute",
  },
  rectangleViewShadowBox: {
    shadowOpacity: 1,
    elevation: 60,
    shadowRadius: 60,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_5xs,
    height: 70,
    width: 346,
    left: 0,
    top: 0,
    position: "absolute",
    backgroundColor: Color.white,
  },
  featuredTagItem: {
    backgroundColor: Color.darkslategray_100,
    left: 27,
    width: 32,
    top: 23,
    borderRadius: Border.br_3xs,
  },
  groupChild2Layout: {
    height: 32,
    width: 32,
    position: "absolute",
  },
  text: {
    left: 35,
    fontFamily: FontFamily.sFProDisplaySemibold,
    top: 28,
    position: "absolute",
  },
  keyTypo: {
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontWeight: "600",
  },
  mg: {
    marginTop: 80,
    marginBottom:80,
  },
  groupChild2: {
    backgroundColor: "transparent",
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
  },
  rectangleParent3: {
    left: 27,
    width: 32,
    top: 23,
  },
});

export default Home;
