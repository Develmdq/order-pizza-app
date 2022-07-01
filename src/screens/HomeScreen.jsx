import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "../stylesGlobal/stylesGlobalScreen";
import LoginForm from "../components/LoginForm";

const HomeScreen = () => (
  <View style={styles.parentContainer}>
    <View>
      <Animatable.Image
        source={require("../../assets/logo.png")}
        animation={"bounceIn"}
        duration={3500}
      />
    </View>    
    <View>
      <LoginForm />
    </View>
  </View>
);

export default HomeScreen;
