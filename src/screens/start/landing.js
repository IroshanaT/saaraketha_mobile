import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontFamily, Color, Border, FontSize } from "../../../GlobalStyles";

//first screen
const LandingScreen = () => {
  const [lan, setLan] = useState("English");
  const navigation = useNavigation();

  const handleClick = async () => {
    if (lan === "සිංහල") {
      setLan("English");
    } else {
      setLan("සිංහල");
    }
  };

  const nav = () => {
    navigation.replace("Login");
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg2.png")}
      style={styles.landing}
    >
      <Text style={styles.welcome}>{`WELCOME `}</Text>
      <Text style={[styles.toTheSaraketha, styles.toTheSarakethaTypo]}>
        To The Saraketha
      </Text>

      <Text
        style={[styles.revolutionizeYourRice, styles.toTheSarakethaTypo]}
      >{`Revolutionize your rice production with our 
cutting-edge AI-powered solution for real-time detection and prevention of diseases and pets `}</Text>

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button2} onPress={handleClick}>
                      <Text style={styles.buttonText}>{lan}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container2}>
        <View style={styles.buttonContainer2}>
          <TouchableOpacity style={styles.button} onPress={nav}>
            <Text style={styles.buttonText}>Get Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  toTheSarakethaTypo: {
    fontFamily: FontFamily.urbanistMedium,
    textAlign: "center",
    left: "50%",
    position: "absolute",
  },
  groupLayout: {
    height: 37,
    width: 125,
    position: "absolute",
  },
  groupPosition: {
    backgroundColor: Color.darkslategray_200,
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
  },

  welcome: {
    marginLeft: -108.5,
    top: 315,
    fontSize: 45,
    color: "#7bc700",
    textAlign: "center",
    fontFamily: FontFamily.urbanistSemibold,
    fontWeight: "600",
    left: "50%",
    position: "absolute",
  },
  toTheSaraketha: {
    marginLeft: -71,
    top: 364,
    fontSize: FontSize.size_lg,
    color: Color.darkslategray_100,
  },
  groupChild: {
    height: 37,
    width: 125,
    position: "absolute",
  },
  groupWrapper: {
    left: 0,
    top: 0,
  },
  english: {
    top: 7,
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 21,
    fontFamily: FontFamily.poppinsRegular,
    color: "#e9ffe5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 125,
    textAlign: "center",
    left: 0,
    position: "absolute",
  },
  groupParent: {
    top: 81,
    left: 140,
  },

  revolutionizeYourRice: {
    marginLeft: -172.65,
    top: 442,
    fontSize: FontSize.size_base,
    color: Color.darkslategray_200,
    width: 352,
  },
  landing: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },

  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 70,
  },

  container2: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer2: {
    alignItems: "center",
    marginBottom: 60,
    },
    button: {
        backgroundColor: Color.darkslategray_200,
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius: Border.br_3xs,
      },
  button2: {
    backgroundColor: Color.darkslategray_200,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: Border.br_3xs,
  },
  buttonText: {
    fontSize: FontSize.size_mini,
    color: "white",
    fontFamily: FontFamily.poppinsRegular,
  },
});

export default LandingScreen;
