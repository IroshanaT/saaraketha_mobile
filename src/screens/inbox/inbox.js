import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
    Image,
    StatusBar,
    TouchableOpacity,
    TextInput,
  } from "react-native";
  import React, { useState, useEffect,useRef } from "react";
  import { FontFamily, Color, FontSize, Border } from "../../../GlobalStyles";
  import { useNavigation } from "@react-navigation/core";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  
  import { db, storage } from "../../../firebase";
  import {
    collection,
    getDocs,
    doc,
    addDoc,
    query,
    getDoc,
    Timestamp,
    orderBy,
  } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  
  export default function Inbox() {
    const navigation = useNavigation();
    const auth = getAuth();
    const flatListRef = useRef(null);
  
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [userID, setUserID] = useState("");
    const [text, onChangeText] = React.useState("");
  
    const fetchMessage = async () => {
      if (userID != "") {
        await getDocs(
          query(collection(db, "messages"), orderBy("createdAt", "asc"))
        ).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            docid: doc.data().id,
            message: doc.data().message,
            disease: doc.data().disease,
            coordinate: doc.data().coordinate,
            wind_speed: doc.data().wind_speed,
            createdAt: doc.data().createdAt,
            user_id: doc.data().user_id,
            user_name: doc.data().name,
            imageUrl: doc.data().imageUrl,
          }));
          setMessages(newData);
        });
      }
    };
  
    const sendMessage = async () => {
      if (userID != "") {
        const docRef = doc(db, "user", userID);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const userDetails = docSnap.data();
          const data = {
            id: "null",
            message: text,
            createdAt: Timestamp.fromDate(new Date()),
            user_id: userID,
            user_name: userDetails.name,
            imageUrl: userDetails.imageUrl,
          };
  
          console.log("aaaaaaaaa");
          console.log(data);
          const docRef = await addDoc(collection(db, "messages"), data);
          if (docRef.id) {
            onChangeText("");
            console.log("Created Successfully");
            fetchMessage();
          } else {
            console.log("Something went wrong. Try again");
          }
        } else {
          console.log("No such document!");
        }
      }
    };
  
    const viewLocation = (item) => {
      navigation.navigate("Map", { status: "Inbox", InboxData: item });
    };
  
    const Item = ({ item }) => (
      <View
        style={[styles.box, item.user_id == userID ? styles.box1 : styles.box2]}
      >
        <View style={styles.row}>
          <View style={styles.col70}>
            {item.docid != "null" && (
              <View>
                <Text style={styles.boxTitle}>{item.disease} Infected</Text>
                <TouchableOpacity
                  style={styles.linlbox}
                  onPress={() => viewLocation(item)}
                >
                  <Text>View Location</Text>
                </TouchableOpacity>
              </View>
            )}
            {item.docid == "null" && (
              <View>
                <Text style={styles.boxTitle}>{item.message}</Text>
              </View>
            )}
            <Text style={styles.datetime}>
              {item.createdAt.toDate().toLocaleTimeString("en-US", {
                timeZone: "Asia/Colombo",
              })}
            </Text>
          </View>
          <View style={[styles.col30, styles.center]}>
            <Image
              style={[styles.avater]}
              resizeMode="cover"
              source={{ uri: item.imageUrl }}
            />
          </View>
        </View>
      </View>
    );
  
    const renderItem = ({ item }) => <Item item={item} />;
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setUserID(uid);
          fetchMessage().then(() => {
            setLoading(false);
          });
        }
      });
    }, [loading, userID]);
  
    const scrollToBottom = () => {
      flatListRef.current.scrollToEnd();
    };
  
  
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../../assets/bg3.png")}
      >
        <StatusBar style="dark" hidden={false} backgroundColor="#bbff4d" />
        <Text style={styles.title}>Crowd source community</Text>
        {!loading && (
          <FlatList
            
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onRefresh={() => fetchMessage()}
            refreshing={loading}
            contentContainerStyle={{ justifyContent: 'flex-end' }} 
          />
        )}
        <View style={styles.messagebox}>
          <View style={styles.row}>
            <View style={styles.col80}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
              />
            </View>
            <TouchableOpacity style={styles.col20} onPress={() => sendMessage()}>
              <MaterialCommunityIcons
                name="send-circle"
                size={50}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 30,
      flexDirection: "column",
      justifyContent: "center",
    },
    messagebox: {
      paddingTop: 20,
    },
    col80: {
      width: "80%",
    },
    col20: {
      width: "20%",
      alignItems: "flex-end",
      justifyContent: "center",
    },
    input: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    avater: {
      width: 50,
      height: 50,
      borderRadius: 100,
    },
    box: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      width: "100%",
    },
    boxTitle: {
      fontWeight: "700",
      fontSize: 15,
    },
    box1: {
      backgroundColor: "#bbff4d",
    },
    box2: {
      backgroundColor: "#eee",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    welcomeTypo: {
      textAlign: "center",
      fontFamily: FontFamily.urbanistRegular,
      color: Color.black,
      position: "absolute",
    },
    title: {
      fontWeight: "700",
      fontSize: 20,
      textAlign: "center",
    },
    welcome: {
      top: 230,
      left: 140,
      fontSize: 36,
    },
    imageContainer: {
      alignItems: "center",
      marginTop: 90,
    },
    image: {
      width: 120,
      height: 120,
    },
    form: {
      width: "100%",
      marginTop: 140,
    },
    formGroup: {
      marginTop: 10,
    },
    error: {
      color: "red",
      marginTop: 5,
      left: "7%",
    },
    button: {
      backgroundColor: "#00cc99",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },
  
    forgotPassword: {
      top: 7,
      right: 28,
      fontSize: FontSize.size_xs,
      textAlign: "right",
      color: Color.limegreen,
      fontFamily: FontFamily.poppinsSemibold,
    },
  
    buttonL: {
      top: 20,
      paddingHorizontal: 12,
      paddingVertical: 10,
      width: "84%",
      left: "8%",
      borderRadius: Border.br_3xs,
    },
    textL: {
      fontSize: FontSize.size_mid,
      fontWeight: "600",
      fontFamily: FontFamily.urbanistSemibold,
      color: Color.darkslategray_100,
      textAlign: "center",
    },
  
    dontYouHave: {
      color: Color.black,
    },
    createNewAccount: {
      color: Color.limegreen,
    },
    dontYouHaveContainer: {
      top: 30,
      left: 45,
      fontSize: FontSize.size_mini,
      fontWeight: "500",
      fontFamily: FontFamily.urbanistMedium,
    },
  });
  