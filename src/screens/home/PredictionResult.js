import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const PredictionResult = ({ route }) => {
  const { label } = route.params;

  return (
    <ImageBackground
      source={require("../../../assets/bg3.png")}
      style={styles.landing}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Yield Prediction</Text>
          <Text style={styles.label}>{`Yield Prediction: ${label}`}</Text>
          <Text style={[styles.label, { marginTop: 6 }]}>
            Smaple Description
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  landing: {
    backgroundColor: "#edebeb",
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000033",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#000",
  },
  box: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 250,
    width: 340,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PredictionResult;
