import React from "react";
import Platform, { Text } from "react-native";
import { useFonts, Montserrat } from "@expo-google-fonts/inter";

const AppText = ({
  children,
  style,
  onPress,
  ellipsizeMode,
  numberOfLines,
}) => {
  let [fontsLoaded] = useFonts({
    //Montserrat: require("../../../assets/fonts/Montserrat/Montserrat-Medium.ttf"),
    Montserrat,
  });
  return (
    <Text
      onPress={onPress}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[style, { fontFamily: Montserrat }]}
    >
      {children}
    </Text>
  );
};

export default AppText;
