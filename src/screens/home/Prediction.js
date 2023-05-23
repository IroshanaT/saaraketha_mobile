import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

export default function PredictionScreen() {
  const [state, setState] = useState("");
  const [year, setYear] = useState("");
  const [nitrogen_prg, setNitrogenPrg] = useState("");
  const [nitrogen_Pounds_Acre, setNitrogenPoundsAcre] = useState("");
  const [phosphorous_prg, setPhosphorousPrg] = useState("");
  const [phosphorous_Pounds_Acre, setPhosphorousPoundsAcre] = useState("");
  const [potash_prg, setPotashPrg] = useState("");
  const [potash_pounds_Acre, setPotashPoundsAcre] = useState("");
  const [areaPlanted_acres, setAreaPlantedAcres] = useState("");
  const [harvested_Area_acres, setHarvestedAreaAcres] = useState("");
  const [lint_Yield_Pounds_Harvested_Acre, setLintYield] = useState("");
  const [prediction, setPrediction] = useState("");

  const navigation = useNavigation();

  const validateInputs = () => {
    if (
      state === "" ||
      nitrogen_prg === "" ||
      nitrogen_Pounds_Acre === "" ||
      phosphorous_prg === "" ||
      phosphorous_Pounds_Acre === "" ||
      potash_prg === "" ||
      potash_pounds_Acre === "" ||
      areaPlanted_acres === "" ||
      harvested_Area_acres === "" ||
      lint_Yield_Pounds_Harvested_Acre === ""
    ) {
      Alert.alert("All fields are required.");
      return false;
    }

    return true;
  };

  const predictCropYield = () => {
    console.log("calling " + !validateInputs());
    if (!validateInputs()) {
      return;
    }

    axios
      .post("http://192.168.8.100:5000/predict", {
        state: state,
        year: 2020,
        nitrogen_presentage: nitrogen_prg,
        nitrogen_Pounds_Acre: nitrogen_Pounds_Acre,
        phosphorous_presentage: phosphorous_prg,
        phosphorous_Pounds_Acre: phosphorous_Pounds_Acre,
        potash_presentage: potash_prg,
        potash_pounds_Acre: potash_pounds_Acre,
        areaPlanted_acres: areaPlanted_acres,
        harvested_Area_acres: harvested_Area_acres,
        lint_Yield_Pounds_Harvested_Acre: lint_Yield_Pounds_Harvested_Acre,
      })
      .then((response) => {
        setPrediction(response.data.prediction);

        navigation.navigate("PredictionResult", { label: prediction });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg3.png")}
      style={styles.landing}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Rice Variety Recommendation</Text>
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setState(text)}
              value={state}
              label="State"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNitrogenPrg(text)}
              value={nitrogen_prg}
              label="Nitrogen percentage"
              keyboardType="numeric"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setNitrogenPoundsAcre(text)}
              value={nitrogen_Pounds_Acre}
              label="Nitrogen Pounds per Acre "
              keyboardType="numeric"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setPhosphorousPrg(text)}
              value={phosphorous_prg}
              label="Phosphorous Presentage"
              keyboardType="numeric"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setPhosphorousPoundsAcre(text)}
              value={phosphorous_Pounds_Acre}
              label="Phosphorous Pounds per Acre"
              keyboardType="numeric"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setPotashPrg(text)}
              value={potash_prg}
              label="Potash Presentage"
              keyboardType="numeric"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setPotashPoundsAcre(text)}
              value={potash_pounds_Acre}
              label="Potash Presentage per acre"
              keyboardType="numeric"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setAreaPlantedAcres(text)}
              value={areaPlanted_acres}
              label="Area Planted (in acres)"
              keyboardType="numeric"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setHarvestedAreaAcres(text)}
              value={harvested_Area_acres}
              label="Harvested Area (in acres)"
              keyboardType="numeric"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setLintYield(text)}
              value={lint_Yield_Pounds_Harvested_Acre}
              label="Amount of pesticide (per acre)"
              keyboardType="numeric"
              selectionColor="#50D100"
              underlineColor="#50D100"
              activeUnderlineColor="#50D100"
              outlineColor="#E9FFE5"
              activeOutlineColor="#E9FFE5"
              contentStyle={{ backgroundColor: "#E9FFE5" }}
            />

            <Button
              mode="contained"
              onPress={predictCropYield}
              style={styles.button}
            >
              Predict Crop Yield
            </Button>
          </View>

          {prediction !== "" && (
            <Text style={styles.prediction}>
              Predicted crop yield: {prediction} pounds per acre
            </Text>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    height: "100%",
  },
  input: {
    marginVertical: 8,
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  prediction: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    marginVertical: 16,
    backgroundColor: "#50D100",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
