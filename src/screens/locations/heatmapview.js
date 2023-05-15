import React, { useEffect, useState } from "react";
import MapView, { Marker, Heatmap } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default function HeatmapView({ route }) {
  const { data } = route.params;
  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState([]);
  const [windSpeed, setWindSpeed] = useState(0);

  const API_KEY = "6196a3c39d7c6dae5c99a09d890c0e54";

  const fetch_wind = async () => {
    const url =
      `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${data.coordinate.latitude}&lon=${data.coordinate.longitude}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "75e73ca1f1mshf48e21f35f3889ep1a6d1ajsnbc0c6d8d44f6",
        "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log("wind_speed : ",result.data[0].wind_spd);
      setWindSpeed(result.data[0].wind_spd);
    } catch (error) {
      console.error(error);
    }
  };

  const gaussian_plume = (x, y, z, Q, u, H, sigma_y, sigma_z) => {
    //fetch_wind();
    const exp_y = Math.exp(Math.pow(-0.5 * (y / sigma_y), 2));
    const exp_z1 = Math.exp(Math.pow(-0.5 * ((z - H) / sigma_z), 2));
    const exp_z2 = Math.exp(Math.pow(-0.5 * ((z + H) / sigma_z), 2));
    const C =
      (Q / (2 * 3.14 * u * sigma_y * sigma_z)) * exp_y * (exp_z1 + exp_z2);

    const h_data = [
      {
        latitude: data.coordinate.latitude,
        longitude: data.coordinate.longitude,
        weight: C,
      },
    ];

    setHeatmapData(h_data);
    console.log(heatmapData);
  };

  useEffect(() => {
    console.log(data.wind_speed);
    gaussian_plume(1000, 0, 10, 10, 5, data.wind_speed, 50, 20);
    setLoading(false);
  }, [loading]);

  return (
    <View style={styles.container}>
      {!loading && (
        <MapView
          style={styles.map}
          mapType={"hybrid"}
          initialRegion={{
            latitude: data.coordinate.latitude,
            longitude: data.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: data.coordinate.latitude,
              longitude: data.coordinate.longitude,
            }}
          />
          <Heatmap
            points={heatmapData}
            tracksViewChanges={false}
            opacity={0.7}
            radius={50}
            gradient={{
              colors: ["green", "yellow", "red"],
              startPoints: [0.2, 0.7, 1],
              colorMapSize: 200,
            }}
          />
        </MapView>
      )}

      {loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
