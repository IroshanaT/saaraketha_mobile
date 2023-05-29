import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../../../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import { storage, db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../../contexts/auth";
import BottomSheet from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { cos } from "react-native-reanimated";


const View2 = ({ route }) => {
  const navigation = useNavigation();
  const { params } = route;

  const { userId, uName } = useContext(AuthContext);
  useEffect(() => {
    if (params === undefined) {
      navigation.navigate("ViewAll");
    }
  }, [params, navigation]);

  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (params !== undefined) {
      let { url, pred, idd } = route.params;
      console.log(idd);
      console.log(pred);

      setPredict(pred);
      setPhoto(url);
      setId(idd);
    }
  }, [params]);

  useEffect(() => {
    if (predict === "") {
      navigation.navigate("ViewAll");
    }
  }, [predict]);

  const [id, setId] = useState("");
  const [photo, setPhoto] = useState("");
  const [predict, setPredict] = useState("");
  const [err, setErr] = useState("");



  const  diseaseData = (predict) => {
    if (
      predict === "ThripsDamage" ||
      predict === "Thrips_damage" ||
      predict === "Thrips_damage\n" ||
      predict === "ThripsDamage\n"
    ) {
      return (
        <View style={{ marginLeft: 20, marginTop: 30, marginRight: 20 }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FontFamily.urbanistMedium,
              marginTop: 10,
              textAlign: "left",
              flexWrap: "wrap",
            
            }}
          >
            Thrips damage is caused by the Stenchaetothrips biformis (Bagnall).
            Periods of dry weather favor the development of the rice thrips. No
            standing water in the rice fields encourages damage. These insects
            are present in all rice environments. In the tropics, the rice
            thrips becomes abundant in dry periods from July to September and
            January to March. In temperate areas, the insects migrate and
            hibernate on  graminaceous weeds during the winter season. Thrips
            damage normally hides underneath unopened leaves and feed on the
            young tissues. The feeding causes small sliver marks or yellow
            patches on the leaf and stems. Heavy feeding causes the leaves to
            curl at the edges before turning yellow and dying. The plants growth
            can be severely restricted and the whole plant can die if the insect
            is not controlled.
          </Text>
        </View>
      );
    } else if (
      predict === "rice_blast" ||
      predict === "RiceBlast" ||
      predict === "RiceBlast\n" ||
      predict === "rice_blast\n"
    ) {
      return (
        <View style={{ marginLeft: 20, marginTop: 30, marginRight: 20 }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FontFamily.urbanistMedium,
              marginTop: 10,
              textAlign: "left",
              flexWrap: "wrap",
            }}
          >
            Rice blast caused by the fungus Magnopothe oryzae, is generally
            considered the most destructive disease of the rice . Rice blast is
            named as leaf blast , nodel blast,panical blast or neck blast, based
            on the part of the plant infected . A leaf blast infection can kill
            seedings or plants up to the tillering stage. Rce blast occurs in
            areas with low soil moisture, frequent and prolonged periods or rain
            shower,and cool temperature in the daytime.
          </Text>
        </View>
      );
    }  else
      return (
        <View style={{ marginLeft: 13, marginTop: 30, marginRight: 20 }}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: FontFamily.urbanistSemibold,
            }}
          >
            Healthy
          </Text>
        </View>
      );
  };

  const TextArea = () => {
    if (photo !== "") {

  
      return (

        <View style={{ marginLeft: 13, marginTop: 30, marginRight: 20,}}>
          <Text
            style={{
              
              fontSize: 17,
              fontFamily: FontFamily.urbanistSemibold,
            }}
          >
            {predict}
          </Text>
          <Text>
          {diseaseData(predict)}
          </Text>
        </View>
      );
    
    }
  };

  const Btn = () => {
    if (photo !== "") {
      return (<>
          <View style ={styles.btnContainer}>  
          
        <TouchableOpacity style={styles.press3} onPress={() => navigation.goBack()}>
          <LinearGradient
            style={[styles.groupChild1, styles.groupParentLayout1]}
            locations={[0, 1]}
            colors={["#5ebc00", "#bbff4d"]}
          />

          <Text
            style={[
              styles.diseaseDetection1,
              styles.ravinduTypo1,
              { color: "white" },
              { marginLeft: 10 },
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.press3} onPress={del}>
        <LinearGradient
          style={[styles.groupChild1, styles.groupParentLayout1]}
          locations={[1, 1]}
          colors={["#222222", "#F2A9A9"]}
        />

        <Text
          style={[
            styles.diseaseDetection1,
            styles.ravinduTypo1,
            { color: "white" },
            { marginLeft: 10 },
          ]}
        >
          Delete
        </Text>
      </TouchableOpacity>
      </View>
      </>
      );
    }
  };

  const del = async () => {
    // Show confirmation dialog
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this plant details?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const subCollectionRef = doc(db, "prediction", userId, "list", id);

            try {
              await deleteDoc(subCollectionRef);
              setPhoto("");
              setPredict("");
              navigation.navigate("ViewAll");
            } catch (error) {
              console.error("Error deleting document:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ImageBackground
        source={require("../../../assets/bg3.png")}
        style={styles.landing}
      >
        <ScrollView>
        <View style={styles.container}>
        <View>
          <View style={{ marginLeft: 20, marginTop: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: FontFamily.urbanistSemibold,
              }}
            >
              View History
            </Text>
          </View>

          <View style={{ marginLeft: 150, marginTop: 30, marginRight: 20 }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: FontFamily.urbanistSemibold,
              }}
            >
              Captured Image
            </Text>
          </View>
          {photo && (
            <View>
              <Text style={styles.error}>{err}</Text>
              <Image
                style={{
                  width: 352,
                  height: 190,
                  borderRadius: 10,
                  marginLeft: 20,
                  marginTop: 5,
                }}
                resizeMode="cover"
                source={{ uri: photo }}
              />
            </View>
          )}

          <TextArea />
        </View>
        </View>
     </ScrollView>
      </ImageBackground>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["15%", "20%"]}
        initialSnapIndex={0}
        borderRadius={100}
        handleIndicatorStyle={{ backgroundColor: "#96E42E" }}
      >
        <Btn />
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  landing: {
    backgroundColor: "#edebeb",
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },

  groupChild1: {
    backgroundColor: "transparent",
    borderRadius: Border.br_3xs,
    top: 0,
  },
  groupParentLayout1: {
    height: 54,
    width: 160,
    left: 0,
  },

  ravinduTypo1: {
    fontFamily: FontFamily.urbanistSemibold,
    fontWeight: "600",
    lineHeight: 24,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    position: "absolute",
  },
  diseaseDetection1: {
    top: 16,
    left: 45,
    width: 259,
    height: 25,
    textAlign: "left",
    color: Color.darkslategray_200,
  },
  container:{
    height:850,
    marginTop:10,
    paddingBottom:50,
    
  },

  btnContainer:{
    flexDirection: "row",
    gap:10

  },
  press3: {
    left: 25,
  },

  avatar: {
    marginHorizontal: 115,
    backgroundColor: "white",
  },

  groupChild: {
    backgroundColor: "transparent",
    borderRadius: Border.br_3xs,
    top: 0,
  },
  groupParentLayout: {
    height: 5,
    width: 200,
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
    left: 30,
    textAlign: "center",
    color: Color.darkslategray_100,
  },
  press: {
    top: 10,
  },
  press2: {
    top: 20,
    marginBottom: 10,
  },
  press4: {
    top: 20,
    marginBottom: 20,
  },
  contentGp: {
    left: 50,
  },
  card: {
    marginTop: 1,
  },
  error: {
    color: "red",
    marginTop: 5,
    left: "18%",
  },
});

export default View2;
