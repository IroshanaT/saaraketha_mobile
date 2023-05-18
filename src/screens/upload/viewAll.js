import BottomSheet from "@gorhom/bottom-sheet";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import { useIsFocused } from '@react-navigation/native';
import { collection, getDocs, query, where ,doc} from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../contexts/auth";

const Viewall = () => {
  const navigation = useNavigation();
   const isFocused = useIsFocused();

  const { userId, uName } = useContext(AuthContext);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");


  const fetchData = async () => {
    const q = query(collection(db, "prediction", userId, "list"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(data);
  };

  const fetch = async () => {
  
     const parentCollectionRef = doc(db, 'prediction',  userId);
      const q = query(collection(parentCollectionRef, 'list'), where("prediction", '==', search+"\n"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      
    setItems(data);
       
  };
  
    useEffect(()=>{
    console.log(isFocused)
       fetchData();
    },[isFocused])
    
    
    useEffect(() => {
     
    if (search === "") {
      fetchData();
    } else {
      fetch();
    }
  }, [search]);

  const handleChange = (st) => {
    setSearch(st);
  };

  const Card = ({ idd,imageUrl, title }) => (
    <TouchableOpacity
      style={[styles.groupView]}
      onPress={() =>
        navigation.navigate("View", {idd:idd, url: imageUrl, pred: title })
      }
    >
      <View style={styles.card2}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ImageBackground
        source={require("../../../assets/bg3.png")}
        style={styles.landing}
      >
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={handleChange}
            value={search}
          />
        </View>

        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Card idd={item.id} imageUrl={item.image} title={item.prediction} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
  groupView: {
    marginTop: 7,
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
  formGroup: {
    marginTop: 10,
    marginBottem: 20,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: Color.aliceblue,
    borderRadius: Border.br_8xs,
    height: 40,
    width: 330,
    left: "7%",
  },
  card2: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    padding: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
  titleContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 40,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Viewall;
