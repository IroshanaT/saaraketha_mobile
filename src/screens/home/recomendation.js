import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RiceVarietyRecommendation = () => {
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [label, setLabel] = useState("");

  const navigation = useNavigation();

  const predictRice = () => {
    // const data = {
    //   N: parseFloat(N),
    //   P: parseFloat(P),
    //   K: parseFloat(K),
    //   temperature: parseFloat(temperature),
    //   humidity: parseFloat(humidity),
    //   ph: parseFloat(ph),
    //   rainfall: parseFloat(rainfall),
    // };

    if (parseFloat(temperature) < 40 && parseFloat(temperature) > 10) {
      if (parseFloat(ph) < 14 && parseFloat(ph) > 0) {
        var data = JSON.stringify({
          N: parseFloat(N),
          P: parseFloat(P),
          K: parseFloat(K),
          temperature: parseFloat(temperature),
          humidity: parseFloat(humidity),
          ph: parseFloat(ph),
          rainfall: parseFloat(rainfall),
        });
        var config = {
          method: "post",
          url: "http://192.168.8.102:5000/predictRice",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data.predictRice_type));
            let result = JSON.stringify(response.data.predictRice_type);
            setLabel(result);

            navigation.navigate("RecomendationResult", { label: result });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Ph value must be between 0 and 14 ");
      }
    } else {
      alert("Tempature must be between 10'C and 40'C ");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg3.png")}
      style={styles.landing}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Rice Variety Recommendation</Text>
        <TextInput
          label="N"
          value={N}
          selectionColor="#50D100"
          underlineColor="#50D100"
          activeUnderlineColor="#50D100"
          outlineColor="#E9FFE5"
          activeOutlineColor="#E9FFE5"
          contentStyle={{ backgroundColor: "#E9FFE5" }}
          onChangeText={(text) => setN(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="P"
          value={P}
          selectionColor="#50D100"
          underlineColor="#50D100"
          activeUnderlineColor="#50D100"
          outlineColor="#E9FFE5"
          activeOutlineColor="#E9FFE5"
          contentStyle={{ backgroundColor: "#E9FFE5" }}
          onChangeText={(text) => setP(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="K"
          value={K}
          selectionColor="#50D100"
          underlineColor="#50D100"
          activeUnderlineColor="#50D100"
          outlineColor="#E9FFE5"
          activeOutlineColor="#E9FFE5"
          contentStyle={{ backgroundColor: "#E9FFE5" }}
          onChangeText={(text) => setK(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="Temperature"
          value={temperature}
          selectionColor="#50D100"
          underlineColor="#50D100"
          activeUnderlineColor="#50D100"
          outlineColor="#E9FFE5"
          activeOutlineColor="#E9FFE5"
          contentStyle={{ backgroundColor: "#E9FFE5" }}
          onChangeText={(text) => setTemperature(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="Humidity"
          value={humidity}
          selectionColor="#50D100"
          underlineColor="#50D100"
          activeUnderlineColor="#50D100"
          outlineColor="#E9FFE5"
          activeOutlineColor="#E9FFE5"
          contentStyle={{ backgroundColor: "#E9FFE5" }}
          onChangeText={(text) => setHumidity(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="pH"
          value={ph}
          selectionColor="#50D100"
          underlineColor="#50D100"
          activeUnderlineColor="#50D100"
          outlineColor="#E9FFE5"
          activeOutlineColor="#E9FFE5"
          contentStyle={{ backgroundColor: "#E9FFE5" }}
          onChangeText={(text) => setPh(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="Rainfall"
          value={rainfall}
          selectionColor="#50D100"
          underlineColor="#50D100"
          activeUnderlineColor="#50D100"
          outlineColor="#E9FFE5"
          activeOutlineColor="#E9FFE5"
          contentStyle={{ backgroundColor: "#E9FFE5" }}
          onChangeText={(text) => setRainfall(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <Button mode="contained" onPress={predictRice} style={styles.button}>
          Predict
        </Button>
        {/* {label !== "" && (
        <Text style={styles.label}>{`Recommended rice variety: ${label}`}</Text>
      )} */}
      </View>
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
  container: {
    flex: 1,
    padding: 16,
    //backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 16,
    backgroundColor: "#50D100",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 32,
  },
});

export default RiceVarietyRecommendation;
