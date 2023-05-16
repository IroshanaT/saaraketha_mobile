import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import MapView, { Marker, Heatmap } from "react-native-maps";
import { FontFamily, FontSize, Color, Border } from "../../../GlobalStyles";
import { BottomSheet } from "react-native-btr";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { db, storage } from "../../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Map = ({ route }) => {

  const { status,InboxData } = route.params;

  const navigation = useNavigation();
  const auth = getAuth();

  const [visible, setVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selecLocation, setSelecLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [sparying, setSparying] = useState(false);


  const onpressfunction = (data) => {
    console.log(data.coordinate.latitude);
    setSelecLocation(data);
    toggleBottomNavigationView();
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const fetchPoints = async () => {
    if(status == "Inbox"){
      await getDocs(
        query(collection(db, "location"))
      ).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          disease: doc.data().disease,
          coordinate: doc.data().coordinate,
          wind_speed: doc.data().wind_speed,
        }));
        setLocations(newData);
      });
    }else if(status == "Initial"){
      if (userID != "") {
        await getDocs(
          query(collection(db, "location"), where("user_id", "==", userID))
        ).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            disease: doc.data().disease,
            coordinate: doc.data().coordinate,
            wind_speed: doc.data().wind_speed,
          }));
          setLocations(newData);
        });
      }
    }
    
  };

  const shareLocation = async () => {
    console.log(selecLocation);
    if (userID != "") {

      const docRef = doc(db, "user", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userDetails = docSnap.data();
        const data = {
          id: selecLocation.id,
          disease: selecLocation.disease,
          coordinate: selecLocation.coordinate,
          wind_speed: selecLocation.wind_speed,
          createdAt: Timestamp.fromDate(new Date()),
          user_id: userID,
          user_name: userDetails.name,
          imageUrl: userDetails.imageUrl,
        };

        console.log(data);
        const docRef = await addDoc(collection(db, "messages"), data);
        if (docRef.id) {
          console.log("Created Successfully");
          navigation.navigate("Inbox");
        } else {
          console.log("Something went wrong. Try again");
        }
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    console.log(status,InboxData);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserID(uid);
        fetchPoints().then(() => {
          setLoading(false);
        });
      }
    });
  }, [loading, userID]);

  // latitude: status == "Initial" ? locations[0].coordinate.latitude : InboxData.coordinate[0].latitude,
  // longitude: status == "Initial" ? locations[0].coordinate.longitude : InboxData.coordinate[0].longitude,

  return (
    <ImageBackground
      source={require("../../../assets/bg3.png")}
      style={styles.landing}
    >
      <StatusBar
        style="dark"
        hidden={false}
        backgroundColor="#bbff4d"
        translucent={true}
      />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType={"hybrid"}
          initialRegion={{
            // latitude: 7.4867,
            // longitude: 80.3604,
            latitude: status == "Initial" ?  7.4867 : InboxData.coordinate.latitude,
            longitude: status == "Initial" ? 80.3604 : InboxData.coordinate.longitude,

            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
        >
          {!loading &&
            locations.map((data, index) => (
              <Marker
                tracksViewChanges={false}
                key={data.id}
                coordinate={{
                  latitude: parseFloat(data.coordinate.latitude),
                  longitude: parseFloat(data.coordinate.longitude),
                }}
                onPress={() => onpressfunction(data)}
                onSelect={() => onpressfunction(data)}
              />
            ))}
        </MapView>
      </View>
      {visible && (
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View style={[styles.bottomNavigationView, { height: "73%" }]}>
            <MaterialCommunityIcons
              name="map-marker"
              size={60}
              color="black"
              style={styles.bottomMarker}
            />
            <Text style={[styles.bootmTitle]}>Selected Location</Text>
            <View>
              <View style={styles.row}>
                <Text style={styles.bottomText}>Infected Disease:</Text>
                <Text style={[styles.bottomText, styles.diseseText]}>
                  {selecLocation.disease}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.bottomText}>Latitude:</Text>
                <Text style={[styles.bottomText, styles.locationText]}>
                  {selecLocation.coordinate.latitude}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.bottomText}>Latitude:</Text>
                <Text style={[styles.bottomText, styles.locationText]}>
                  {selecLocation.coordinate.longitude}
                </Text>
              </View>
              <Pressable
                style={[styles.groupView, styles.calcButton]}
                onPress={() =>
                  navigation.navigate("HeatMap", { data: selecLocation })
                }
              >
                <LinearGradient
                  style={[styles.groupChild, styles.groupParentLayout]}
                  locations={[0, 1]}
                  colors={["#5ebc00", "#bbff4d"]}
                />
                <Text style={[styles.diseaseDetection, styles.ravinduTypo]}>
                  Calculate Dispersionr
                </Text>
              </Pressable>
              <View style={{ marginTop: 20 }}>
                <Pressable onPress={() => shareLocation()}>
                  <LinearGradient
                    style={[styles.groupChild, styles.groupParentLayout]}
                    locations={[0, 1]}
                    colors={["#000", "#222"]}
                  />
                  <Text
                    style={[
                      styles.diseaseDetection,
                      styles.ravinduTypo,
                      { color: "#fff" },
                    ]}
                  >
                    Share
                  </Text>
                </Pressable>
              </View>
              <View style={{ marginTop: 20 }}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("HeatMap", { data: selecLocation })
                  }
                >
                  <LinearGradient
                    style={[styles.groupChild, styles.groupParentLayout]}
                    locations={[0, 1]}
                    colors={["#000", "#222"]}
                  />
                  <Text
                    style={[
                      styles.diseaseDetection,
                      styles.ravinduTypo,
                      { color: "#fff" },
                    ]}
                  >
                    Spray
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </BottomSheet>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  calcButton: {
    marginBottom: 0,
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bottomText: {
    fontSize: 18,
  },
  bottomMarker: {
    marginTop: 50,
    textAlign: "center",
  },
  locationText: {
    fontWeight: "700",
  },

  bootmTitle: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 20,
  },
  diseseText: {
    fontWeight: "700",
    color: "#f00",
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
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
    textAlign: "center",
    position: "absolute",
  },
  diseaseDetection: {
    top: 16,
    width: "100%",
    height: 25,
    textAlign: "center",
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
    width: "100%",
  },
  group: {
    marginLeft: 20,
    marginTop: 70,
    position: "absolute",
  },
  groupView: {
    marginTop: 30,
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

export default Map;
