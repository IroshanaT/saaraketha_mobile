import BottomSheet from "@gorhom/bottom-sheet";
import React, { useContext,useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Dialog, Portal, Provider, Avatar, Title } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc} from "firebase/firestore";
import { storage, db } from "../../../firebase";
import { AuthContext } from "../../contexts/auth";
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const Save = ({ route }) => {
  const navigation = useNavigation();
  const { params } = route;
  const { userId,uName} = useContext(AuthContext);

  useEffect(() => {
    if (params === undefined) {
      navigation.navigate('Upload');
    }
  }, [params, navigation]);

  

  useEffect(() => {
    if (params !== undefined) {
      let { url , pred } = route.params;
      setPredict(pred);
      setPhoto(url);
    }
 
  }, [params]);

  const bottomSheetRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [photo, setPhoto] = useState("");
  const [predict, setPredict] = useState("");
  const [err, setErr] = useState("");
  const [ur, setUr] = useState("");

  const ng = () =>{
   navigation.navigate('Upload');
  }


  const Btn = () =>{

 
  
  if(predict === "ThripsDamage" || predict === "Thrips_damage" || predict === "Thrips_damage\n" ||  predict ===  "ThripsDamage\n" ||predict === "rice_blast"|| predict === "RiceBlast" || predict === "RiceBlast\n" || predict ===  "rice_blast\n"){
   return (
    <TouchableOpacity style={styles.press3} onPress={showDialog}>
          <LinearGradient
            style={[styles.groupChild1, styles.groupParentLayout1]}
            locations={[0, 1]}
            colors={["#5ebc00", "#bbff4d"]}
          />

          <Text
            style={[
              styles.diseaseDetection1,
              styles.ravinduTypo1,
              { color: "black" },
              { marginLeft: 18 },
            ]}
          >
            Save Details
          </Text>
        </TouchableOpacity>
   )
  }else
  { 
    return (
    <TouchableOpacity style={styles.press3} onPress={ng}>
          <LinearGradient
            style={[styles.groupChild1, styles.groupParentLayout1]}
            locations={[0, 1]}
            colors={["#5ebc00", "#bbff4d"]}
          />

          <Text
            style={[
              styles.diseaseDetection1,
              styles.ravinduTypo1,
              { color: "black" },
              { marginLeft: 40 },
            ]}
          >
            Back 
          </Text>
        </TouchableOpacity>
    )
  }
  
  }
  
  const TextArea = () => {
    if (predict === "ThripsDamage" || predict === "Thrips_damage" || predict === "Thrips_damage\n" ||  predict ===  "ThripsDamage\n") {
      return (
        <View style={{marginLeft:20,marginTop: 30, marginRight: 20 }}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: FontFamily.urbanistSemibold,
            }}
          >
            Thrips Damage
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FontFamily.urbanistMedium,
              marginTop: 10,
              textAlign: "left",
            }}
          >
            Thrips damage is caused by the Stenchaetothrips biformis (Bagnall). Periods of dry weather favor the development of the rice thrips. No standing water in the rice fields encourages damage. These insects are present in all rice environments. In the tropics, the rice thrips becomes abundant in dry periods from July to September and January to March. In temperate areas, the insects migrate and hibernate on  graminaceous weeds during the winter season. Thrips damage normally hides underneath unopened leaves and feed on the young tissues. The feeding causes small sliver marks or yellow patches on the leaf and stems. Heavy feeding causes the leaves to curl at the edges before turning yellow and dying. The plants growth can be severely restricted and the whole plant can die if the insect is not controlled.
          </Text>
          
        </View>
      );
    } else if (predict === "rice_blast"|| predict === "RiceBlast" || predict === "RiceBlast\n" || predict ===  "rice_blast\n") {
      return(
        <View style={{marginLeft:20, marginTop: 30, marginRight: 20 }}>
        <Text
          style={{
            fontSize: 17,
            fontFamily: FontFamily.urbanistSemibold,
          }}
        >
          Rice Blast
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: FontFamily.urbanistMedium,
            marginTop: 10,
            textAlign: "left",
          }}
        >
          Rice blast caused by the fungus Magnopothe oryzae , is generally
          considered the most destructive disease of the rice . Rice blast is
          named as leaf blast , nodel blast,panical blast or neck blast, based
          on the part of the plant infected . A leaf blast infection can kill
          seedings or plants up to the tillering stage. Rce blast occurs in
          areas with low soil moisture, frequent and prolonged periods or rain
          shower,and cool temperature in the daytime.
        </Text>
        
        </View>
        
      )
    } else {
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
    }
  };



  const sv = async () => {
    const response = await fetch(photo);
    const blob = await response.blob();
    const fileName = `disease/${Date.now()}.jpg`;
    const fileRef = ref(storage, fileName);
    await uploadBytes(fileRef, blob);
    const downloadURL = await getDownloadURL(fileRef);
    setUr(downloadURL)

    try {

      const subCollectionRef = collection(doc(db, 'prediction', userId), 'list');
      const newDocRef = doc(subCollectionRef);
      const newData = { name: uName, image: downloadURL,prediction:predict,date:new Date().getDate() };
      await setDoc(newDocRef, newData);
      hideDialog();
    } catch (error) {
      setErr("Error")
    }





  }



  const generatePDF = async () => {

    try {
    
      let options = {
        html:`
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica';
                font-size: 12px;
              }
              header, footer {
                height: 50px;
                background-color: #fff;
                color: #000;
                display: flex;
                justify-content: center;
                padding: 0 20px;
              }
             
            </style>
          </head>
          <body>
            <header>
              <h1>Prediction</h1>
            </header>
            <h1>Prediction</h1>
            <p>${predict}</p>
            <img src=${ur} alt="pred" width="300" height="300">
            <p>${new Date().getDate()}</p>
           
          </body>
        </html>
      `,
      fileName: 'test',
      directory: 'Documents',
      };
      const file = await RNHTMLtoPDF.convert(options);

    } catch (error) {
      console.log(error)
      setErr("Error")
    }
  };



  return (
    <>
      <ImageBackground
        source={require("../../../assets/bg3.png")}
        style={styles.landing}
      >
        <Provider>
        <ScrollView>
          <View>
            <Portal>
              <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: FontFamily.urbanistSemibold,
                  }}
                >
                  Prediction Status
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
              <Dialog
                visible={visible}
                onDismiss={hideDialog}
                style={{
                  backgroundColor: "white",
                  marginBottom: 200,
                  paddingBottom: 60,
                }}
              >
                <Dialog.Content>
                  <View style={styles.card}>
                    <Avatar.Icon
                      icon={() => <Ionicons name="cloud-upload" size={40} />}
                      style={styles.avatar}
                    />
                    <View>
                      <Title
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                        }}
                      >
                        Save Details
                      </Title>
                      <View style={styles.contentGp}>
                        <TouchableOpacity style={styles.press} onPress={sv}>
                          <LinearGradient
                            style={[
                              styles.groupChild,
                              styles.groupParentLayout,
                            ]}
                            locations={[0, 1]}
                            colors={["#5ebc00", "#bbff4d"]}
                          />
                          <Text
                            style={[
                              styles.diseaseDetection,
                              styles.ravinduTypo,
                              { marginLeft: 50 },
                            ]}
                          >
                            Save
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.press2} onPress={generatePDF}>
                          <LinearGradient
                            style={[
                              styles.groupChild,
                              styles.groupParentLayout,
                            ]}
                            locations={[0, 1]}
                            colors={["#333333", "#333333"]}
                          />

                          <Text
                            style={[
                              styles.diseaseDetection,
                              styles.ravinduTypo,
                              { marginLeft: 30 },
                              { color: "white" },
                            ]}
                          >
                            Save as PDF
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </View>
          </ScrollView>
        </Provider>
      </ImageBackground>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["15%", "20%"]}
        initialSnapIndex={0}
        borderRadius={100}
        handleIndicatorStyle={{ backgroundColor: "#96E42E" }}
      >
       <Btn/>
       
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
    height: 58,
    width: 200,
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
  press3: {
    left: 100,
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
    height: 58,
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
  }
});

export default Save;
