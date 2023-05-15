import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Dialog, Portal, Provider, Avatar, Title } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

const Aerial = () => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [photo, setPhoto] = useState(null);
  const [err, setErr] = useState("");
  const [photoShow, setPhotoShow] = useState(null);

  const gallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    let localUri = result.assets[0].uri;
    setPhotoShow(localUri);
  };

  const camera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    let localUri = result.assets[0].uri;
    setPhotoShow(localUri);
  };

  const dicardImage = () => {
    setPhotoShow(null);
  };

  const predict = async () => {

    let filename = photoShow.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("file", { uri: photoShow, name: filename, type });

    await axios
      .post("http://127.0.0.1:5000/areial", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
      
        navigation.navigate("Save", { url:photoShow,pred:res.data.result})
      })
      .catch((err) => {
        setErr("Error")
      });
  };

  return (
    <>
      <ImageBackground
        source={require("../../../assets/bg3.png")}
        style={styles.landing}
      >
        <Provider>
          <View>
            <Portal>
              <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: FontFamily.urbanistSemibold,
                  }}
                >
                  Upload Aerial Image
                </Text>
              </View>

              <View style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: FontFamily.urbanistSemibold,
                  }}
                >
                  What is Aerial Image ?
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: FontFamily.urbanistMedium,
                    marginTop: 10,
                    textAlign: "left",
                  }}
                >
                  Aerial photography typically refers specially to bird’s-eye
                  view images that focus on landscapes and surface objects
                </Text>
              </View>

              <Image
                style={{
                  width: 352,
                  height: 160,
                  borderRadius: 10,
                  marginLeft: 20,
                  marginTop: 5,
                }}
                resizeMode="cover"
                source={require("../../../assets/area1.png")}
              />

              <View style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: FontFamily.urbanistSemibold,
                  }}
                >
                  How to Capture Aerial Image in Rice Plants ?
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: FontFamily.urbanistMedium,
                    marginTop: 10,
                    textAlign: "left",
                  }}
                >
                  Hold the phone over the rice plants as shown in the image and
                  take a photo
                </Text>
              </View>
              <Image
                style={{
                  width: 352,
                  height: 160,
                  borderRadius: 10,
                  marginLeft: 20,
                  marginTop: 5,
                }}
                resizeMode="cover"
                source={require("../../../assets/area2.png")}
              />

              <Dialog
                visible={visible}
                onDismiss={hideDialog}
                style={{ backgroundColor: "white", marginBottom: 200 }}
              >
                <Dialog.Content>
                  {photoShow ? (
                    photoShow && (
                      <View style={styles.imageContainer}>
                        <Text style={styles.error}>{err}</Text> 
                        <Image
                          source={{ uri: photoShow }}
                          style={{ width: 200, height: 200, left: 50 }}
                        />
                        <Pressable style={styles.press2} onPress={predict}>
                          <LinearGradient
                            style={[
                              styles.groupChild,
                              styles.groupParentLayout,
                              { left: 50 },
                            ]}
                            locations={[0, 1]}
                            colors={["#5ebc00", "#bbff4d"]}
                          />

                          <Text
                            style={[
                              styles.diseaseDetection,
                              styles.ravinduTypo,
                              { left: 130 },
                            ]}
                          >
                            Predict
                          </Text>
                        </Pressable>
                        <Pressable style={styles.press4} onPress={dicardImage}>
                          <LinearGradient
                            style={[
                              styles.groupChild,
                              styles.groupParentLayout,
                              { left: 50 },
                            ]}
                            locations={[0, 1]}
                            colors={["#333333", "#333333"]}
                          />

                          <Text
                            style={[
                              styles.diseaseDetection,
                              styles.ravinduTypo,
                              { marginLeft: 50 },
                              { color: "white" },
                              { left: 50 },
                            ]}
                          >
                            Re-Take Image
                          </Text>
                        </Pressable>
                      </View>
                    )
                  ) : (
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
                          Upload Only the Aerial Images
                        </Title>
                        <View style={styles.contentGp}>
                          <Pressable style={styles.press} onPress={camera}>
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
                              ]}
                            >
                              Capture Aerial Image
                            </Text>
                          </Pressable>

                          <Pressable style={styles.press2} onPress={gallery}>
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
                              ]}
                            >
                              Upload Aerial Image
                            </Text>
                          </Pressable>
                          <Pressable style={styles.press4} onPress={hideDialog}>
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
                                { marginLeft: 50 },
                                { color: "white" },
                              ]}
                            >
                              Cancel
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  )}
                </Dialog.Content>
              </Dialog>
            </Portal>
          </View>
        </Provider>
      </ImageBackground>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["15%", "20%"]}
        initialSnapIndex={0}
        borderRadius={100}
        handleIndicatorStyle={{ backgroundColor: "#96E42E" }}
      >
        <Pressable style={styles.press3} onPress={showDialog}>
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
            ]}
          >
            Start Diagnosing
          </Text>
        </Pressable>
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
  },
});

export default Aerial;
