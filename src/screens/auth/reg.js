import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth, storage, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color, FontSize, Border } from "../../../GlobalStyles";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Avatar, Icon } from 'react-native-elements';
import { Dialog, Portal, Provider, Title } from "react-native-paper";
//Registration
const RegScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [repass, setRePass] = useState("");
  const [error, setError] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleReg = async () => {
    if (email === "") {
      setError("Email required");
    } else if (password === "") {
      setError("password required");
    } else {
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileName = `user/${Date.now()}.jpg`;
        const fileRef = ref(storage, fileName);
        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);

        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredentials) => {
            try {
              const userRef = doc(db, "user", userCredentials.user.uid);
              await setDoc(userRef, {
                name: name,
                email: email,
                phone: phone,
                imageUrl: downloadURL,
              });
              showDialog();
            } catch (error) {
              setError("Error");
            }
          })
          .catch((error) => setError("User could not create"));
      } catch (error) {
        setError("File error");
      }
    }
  };

  const validateEmail = (email) => {
    // Regular expression to validate email
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(email)) {
      return true;
    } else {
      if (email === "") {
        return true;
      } else {
        return false;
      }
    }
  };

  const validatePassword = (password) => {
    if (password.length >= 6) {
      return true;
    } else {
      if (password === "") {
        return true;
      } else {
        return false;
      }
    }
  };

  const PasswordRe = (pass) => {
    if (password === pass) {
      return true;
    } else {
      return false;
    }
  };

  const nav = () => {
    navigation.replace("Login");
  };

  const handleEmailChange = (email) => {
    setError("");
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setError("");
    setPassword(password);
  };

  const handleReChange = (password) => {
    setError("");
    setRePass(password);
  };

  const handleNameChange = (name) => {
    setError("");
    setName(name);
  };

  const handlePhoneChange = (phone) => {
    setError("");
    setPhone(phone);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const sv = async () => {
    
    hideDialog()
    nav()

  }

  return (
    <View style={styles.container}>
           <Provider>
      <View style={styles.container1}> 
        <TouchableOpacity onPress={pickImage}>
          {imageUri ? (
            <View style={styles.avatarContainer}>
              <Avatar source={{ uri: imageUri }}  size={100} rounded />
              <Icon
                name="edit"
                type="material"
                color="#000"
                containerStyle={styles.editIcon}
              />
            </View>
          ) : (
            <View style={styles.avatarContainer}>
            <Avatar source={{ uri: "https://picsum.photos/seed/picsum/200/300" }} size={100} rounded />
            <Icon
              name="edit"
              type="material"
              color="#000"
              containerStyle={styles.editIcon}
            />
          </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={handleEmailChange}
            value={email}
          />
          {!validateEmail(email) && (
            <Text style={styles.error}>Please enter a valid email</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            autoCapitalize="none"
            onChangeText={handleNameChange}
            value={name}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            autoCapitalize="none"
            onChangeText={handlePhoneChange}
            value={phone}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            value={password}
          />
          {!validatePassword(password) && (
            <Text style={styles.error}>
              Password must be at least 6 characters long
            </Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Re enter Password"
            secureTextEntry={true}
            onChangeText={handleReChange}
            value={repass}
          />
          {!PasswordRe(repass) && (
            <Text style={styles.error}>Password must match</Text>
          )}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[
            !validateEmail(email) || !validatePassword(password)
              ? styles.buttonDisabled
              : null,
          ]}
          onPress={handleReg}
          disabled={!validateEmail(email) || !validatePassword(password)}
        >
          <LinearGradient
            locations={[0, 1]}
            colors={["#5ebc00", "#bbff4d"]}
            style={styles.buttonL}
          >
            <Text style={styles.textL}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={[styles.dontYouHaveContainer, styles.signIn1FlexBox]}>
          <Text style={styles.dontYouHave}>{`Do you have an account? `}</Text>
          <TouchableOpacity onPress={nav}>
            <Text style={styles.createNewAccount}>Login.</Text>
          </TouchableOpacity>
        </Text>
        </View>
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
                    <Image
                       source={require("../../../assets/regI.png")}
                
                      resizeMode="cover"
                      style={styles.avatar}
                    />
                    <View>
                      <Title
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                        }}
                      >
                        Account Created
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
                            OK
                          </Text>
                        </TouchableOpacity>

                      
                      </View>
                    </View>
                  </View>
                </Dialog.Content>
              </Dialog>
        </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    top: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },
  placeholder: {
    width: 100,
    height: 100,
    backgroundColor: "#cccccc",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  form: {
    width: "100%",
    marginTop: 120,
  },
  formGroup: {
    marginTop: 10,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: Color.aliceblue,
    borderRadius: Border.br_8xs,
    height: 61,
    width: 330,
    left: "8%",
  },
  error: {
    color: "red",
    marginTop: 5,
    left: "8%",
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
    left: 40,
    fontSize: FontSize.size_mini,
    fontWeight: "500",
    fontFamily: FontFamily.urbanistMedium,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  card: {
    marginTop: 1,
  },
  avatar: {
    marginHorizontal: 100,
    backgroundColor: "white",
    marginBottom: 40,
    
    width: 190,
    height: 190,
    borderRadius: 10,
    marginLeft: 45,
    marginTop: 5,
  },
  contentGp: {
    left: 50,
  },
  press: {
    top: 10,
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
  ravinduTypo: {
    fontFamily: FontFamily.urbanistSemibold,
    fontWeight: "900",
    lineHeight: 24,
    fontSize: FontSize.size_mini,
    textAlign: "center",
    position: "absolute",
  },
  diseaseDetection: {
    top: 16,
    left: 35,
    textAlign: "center",
    color: Color.black,
  },
});
export default RegScreen;
