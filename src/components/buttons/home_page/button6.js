import * as React from "react";
import { Dimensions } from "react-native"; // Import Dimensions from react-native
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import { styles } from "../../../styles/style";

const { width } = Dimensions.get("window");

const Button6 = () => {
  return (
    <LinearGradient
      colors={["#F31F1F", "#F2A9A9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ borderRadius: 10, height: 50, flex: 1, marginHorizontal: 10 }}
    >
      <Button
        icon={() => (
          <MaterialCommunityIcons
            name="stop-circle-outline"
            color="white"
            size={24}
          />
        )}
        style={{ ...styles.text_btn_style, width: width - 250 }} // Set width to device width
        mode="contained"
        contentStyle={{ justifyContent: "center" }} // Align content to the left
        labelStyle={{ color: "white", fontSize: 18 }} // Change text color
        onPress={() => console.log("Button pressed")}
      >
        Stop Live
      </Button>
    </LinearGradient>
  );
};

export { Button6 };
