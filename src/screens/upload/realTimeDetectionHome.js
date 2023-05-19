import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../../../GlobalStyles";
import { Avatar, Card, Title } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";

export default function RealTimeDetectionHome() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../../../assets/bg3.png")}
      style={styles.landing}
    >
      <View style={{ marginLeft: 100, marginTop: 40 }}>
        <Text style={{ fontSize: 18, fontFamily: FontFamily.urbanistSemibold }}>
          Real Time Detection
        </Text>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Avatar.Icon
            icon={() => <Ionicons name="cloud-upload" size={32} />}
            style={styles.avatar}
          />
          <Card.Content style={styles.content}>
            <Title style={{ fontSize: 20, textAlign: "center" }}>
              Start Live Stream
            </Title>

            <TouchableOpacity
              style={styles.press}
              onPress={() => navigation.navigate("realTimeDevice")}
            >
              <LinearGradient
                style={[styles.groupChild, styles.groupParentLayout]}
                locations={[0, 1]}
                colors={["#5ebc00", "#bbff4d"]}
              />
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                resizeMode="cover"
                source={require("../../../assets/g11.png")}
              />
              <Text
                style={[
                  styles.diseaseDetection,
                  styles.ravinduTypo,
                  { marginLeft: 10 },
                ]}
              >
                Connect to Device
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.press2}
              onPress={() => navigation.navigate("Detection")}
            >
              <LinearGradient
                style={[styles.groupChild, styles.groupParentLayout]}
                locations={[0, 1]}
                colors={["#333333", "#333333"]}
              />
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                resizeMode="cover"
                source={require("../../../assets/g10.png")}
              />
              <Text
                style={[
                  styles.diseaseDetection,
                  styles.ravinduTypo,
                  { color: "white" },
                ]}
              >
                Connect to Mobile App
              </Text>
            </TouchableOpacity> */}
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  landing: {
    backgroundColor: "#edebeb",
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  container: {
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 16,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    paddingBottom: 40,
    marginTop: "25%",
  },
  avatar: {
    marginTop: 40,
    marginHorizontal: 130,
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
  },

  groupChild: {
    backgroundColor: "transparent",
    borderRadius: Border.br_3xs,
    top: 0,
  },
  groupParentLayout: {
    height: 58,
    width: 250,
    left: 0,
  },
  groupPosition: {
    left: 15,
    top: 15,
    position: "absolute",
  },
  groupItem: {
    width: 28,
    height: 28,
  },
  ravinduTypo: {
    fontFamily: FontFamily.urbanistSemibold,
    fontWeight: "600",
    lineHeight: 24,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    position: "absolute",
  },
  diseaseDetection: {
    top: 16,
    left: 50,
    width: 259,
    height: 25,
    textAlign: "left",
    color: Color.darkslategray_200,
  },
  press: {
    top: 10,
  },
  press2: {
    top: 20,
  },
});
