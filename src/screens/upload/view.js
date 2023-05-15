import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../../../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const View2 = ({ route }) => {
  const navigation = useNavigation();
  const { params } = route;


  useEffect(() => {
    if (params === undefined) {
      navigation.navigate('ViewAll');
    }
  }, [params, navigation]);

  

  useEffect(() => {
    if (params !== undefined) {
        let { url, pred } = route.params;
    
      setPredict(pred);
      setPhoto(url);
    }
 
  }, [params]);


  const [photo, setPhoto] = useState("");
  const [predict, setPredict] = useState("");
  const [err, setErr] = useState("");

    const TextArea = () => {
      console.log(predict)
  
      return (
        <View style={{ marginLeft: 13, marginTop: 30, marginRight: 20 }}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: FontFamily.urbanistSemibold,
            }}
          >
           {predict}
          </Text>
         
        </View>
      );
    }
  



  return (
    <>
      <ImageBackground
        source={require("../../../assets/bg3.png")}
        style={styles.landing}
      >
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
    
      </ImageBackground>
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

export default View2;
