import React from "react";
import { VideoComponent } from "../iotDevice/iot_video";
import { AppBar } from "../../components/AppBar";
import { View } from "react-native";
import { Iot_bottom_card } from "../../components/buttons/home_page/iot_bottom_card";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { styles } from "../../styles/style";

export default function RealTimeDevice() {
  return (
    <SafeAreaProvider>
      <View style={styles.view_container}>
        {/* <VideoComponent /> */}
        <Iot_bottom_card />
      </View>
    </SafeAreaProvider>
  );
}
