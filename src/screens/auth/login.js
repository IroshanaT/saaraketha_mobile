import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color, FontSize, Border } from "../../../GlobalStyles";

//login
const LoginScreen = () => {
  const [email, setEmail] = useState("kr@gmail.com");
  const [password, setPassword] = useState("1234krkr");
  const [error, setError] = useState("");
  const navigation = useNavigation();


  const handleLogin = async () => {
    if (email === "") {
      setError("Email required");
    } else if (password === "") {
      setError("password required");
    } else {
      try {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            navigation.replace("Initial")
          })
          .catch(() => setError("No User"));
      } catch (error) {
        setError("error message");
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

  const nav = () => {
    navigation.replace("Register");
  };

  const handleEmailChange = (email) => {
    setError("");
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setError("");
    setPassword(password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.image}
        />
      </View>
      <Text style={[styles.welcome, styles.welcomeTypo]}>{`Sign In `}</Text>

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
        <TouchableOpacity onPress={nav}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[
            !validateEmail(email) || !validatePassword(password)
              ? styles.buttonDisabled
              : null,
          ]}
          onPress={handleLogin}
          disabled={!validateEmail(email) || !validatePassword(password)}
        >
          <LinearGradient
            locations={[0, 1]}
            colors={["#5ebc00", "#bbff4d"]}
            style={styles.buttonL}
          >
            <Text style={styles.textL}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

  
        <Text style={[styles.dontYouHaveContainer, styles.signIn1FlexBox]}>
          <Text style={styles.dontYouHave}>{`Don’t you have account? `}</Text>
          <TouchableOpacity onPress={nav}>
          <Text style={styles.createNewAccount}>Create new account.</Text>
        </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeTypo: {
    textAlign: "center",
    fontFamily: FontFamily.urbanistRegular,
    color: Color.black,
    position: "absolute",
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
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: Color.aliceblue,
    borderRadius: Border.br_8xs,
    height: 61,
    width: 330,
    left: "7%",
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

export default LoginScreen;
