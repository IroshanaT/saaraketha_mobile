import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {Divider} from 'react-native-paper'
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import { FontFamily, FontSize, Color, Border } from "../../../GlobalStyles";

const Detection = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/bg3.png")}
      style={styles.landing}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginLeft: 20, marginTop: 10 }}>
            <Text
              style={{ fontSize: 18, fontFamily: FontFamily.urbanistSemibold }}
            >
              Disease Detection
            </Text>
          </View>
          <View style={[styles.group]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("RealTimeHome")}
            >
              <LinearGradient
                style={[styles.groupChild, styles.groupParentLayout]}
                locations={[0, 1]}
                colors={["#5ebc00", "#bbff4d"]}
              />
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                resizeMode="cover"
                source={require("../../../assets/g7.png")}
              />
              <Text style={[styles.diseaseDetection, styles.ravinduTypo]}>
                Real-time Disease Identification
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.groupView]}
              onPress={() => navigation.navigate("Upload")}
            >
              <LinearGradient
                style={[styles.groupChild, styles.groupParentLayout]}
                locations={[0, 1]}
                colors={["#5ebc00", "#bbff4d"]}
              />
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                resizeMode="cover"
                source={require("../../../assets/g8.png")}
              />
              <Text style={[styles.diseaseDetection, styles.ravinduTypo]}>
                Upload Image
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.groupView]}
              onPress={() => navigation.navigate("ViewAll")}
            >
              <LinearGradient
                style={[styles.groupChild, styles.groupParentLayout]}
                locations={[0, 1]}
                colors={["#5ebc00", "#bbff4d"]}
              />
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                resizeMode="cover"
                source={require("../../../assets/g6.png")}
              />
              <Text style={[styles.diseaseDetection, styles.ravinduTypo]}>
                History
              </Text>
            </TouchableOpacity>

            <View style={[
              styles.groupView,
            {marginTop:80}
          ]}>
            <Text style={[styles.key2]}>
            Recent searches
            </Text> 
          </View>
          <Divider/>

            <View
              style={[styles.groupView, { marginTop: 60 }]}
              onPress={() => navigation.navigate("ViewAll")}
            >
              <LinearGradient
                style={[styles.groupChild, styles.groupParentLayout2]}
                locations={[0, 1]}
                colors={["#FFFFFF", "#FFFFFF"]}
              />
              <Image
                style={[styles.groupItem2, styles.groupPosition]}
                resizeMode="cover"
                source={require("../../../assets/heathy.jpg")}
              />
              <Text
                style={[
                  styles.diseaseDetection,
                  styles.ravinduTypo,
                  { marginTop: 5 },
                ]}
              >
                Healthy
              </Text>
            </View>

            <View
              style={[styles.groupView, { marginTop: 80 }]}
              onPress={() => navigation.navigate("ViewAll")}
            >
              <LinearGradient
                style={[styles.groupChild, styles.groupParentLayout2]}
                locations={[0, 1]}
                colors={["#FFFFFF", "#FFFFFF"]}
              />
              <Image
                style={[styles.groupItem2, styles.groupPosition]}
                resizeMode="cover"
                source={require("../../../assets/thrips.jpg")}
              />
              <Text
                style={[
                  styles.diseaseDetection,
                  styles.ravinduTypo,
                  { marginTop: 5 },
                ]}
              >
                Thrips Damage
              </Text>
            </View>

            <View
              style={[styles.groupView, { marginTop: 80 }]}
              onPress={() => navigation.navigate("ViewAll")}
            >
              <LinearGradient
                style={[styles.groupChild, styles.groupParentLayout2]}
                locations={[0, 1]}
                colors={["#FFFFFF", "#FFFFFF"]}
              />
              <Image
                style={[styles.groupItem2, styles.groupPosition]}
                resizeMode="cover"
                source={require("../../../assets/rice_blast.jpg")}
              />
              <Text
                style={[
                  styles.diseaseDetection,
                  styles.ravinduTypo,
                  { marginTop: 5 },
                ]}
              >
                Rice Blast
              </Text>
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
    width: 29,
    height: 26,
  },
  groupItem2: {
    width: 49,
    height: 46,
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
  groupParentLayout2: {
    height: 68,
    width: 346,
    left: 0,
    position: "absolute",
  },
  group: {
    marginLeft: 20,
    marginTop: 100,
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
  key2:{
    lineHeight: 20,
    left: 15,
    color: Color.darkslategray_100,
    position: "absolute",
    top: 23,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.urbanistSemibold,
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
  container: {
    height: 700,
    marginTop: 10,
    paddingBottom: 50,
  },
});

export default Detection;
