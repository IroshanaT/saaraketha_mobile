import MainContainer from "./src/navigator";
import { useFonts } from "expo-font"; 
import { AuthProvider } from "./src/contexts/auth";
import 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Urbanist_regular: require("./assets/fonts/Urbanist_regular.ttf"),
    Urbanist_medium: require("./assets/fonts/Urbanist_medium.ttf"),
    Urbanist_semibold: require("./assets/fonts/Urbanist_semibold.ttf"),
    Urbanist_bold: require("./assets/fonts/Urbanist_bold.ttf"),
    Urbanist_regular_italic: require("./assets/fonts/Urbanist_regular_italic.ttf"),
    Poppins_light: require("./assets/fonts/Poppins_light.ttf"),
    Poppins_regular: require("./assets/fonts/Poppins_regular.ttf"),
    Poppins_semibold: require("./assets/fonts/Poppins_semibold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  
  return (
    <AuthProvider>
      <MainContainer />
    </AuthProvider>
  );


}