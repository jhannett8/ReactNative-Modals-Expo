import React, { useRef } from "react";
import { Animated, View } from "react-native";

import { colors } from "../../config/theme";
import AppText from "../dataDisplays/AppText";
import StyleAnimation from "./StyleAnimation";

ShareAnimation = React.forwardRef(({}, ref) => {
  const fadeShare = useRef(new Animated.Value(0)).current;

  React.useImperativeHandle(ref, () => ({
    shareAnimation,
  }));

  const shareAnimation = () => {
    fadeInShare();
    setTimeout(() => {
      fadeOutShare();
    }, 1000);
  };

  const fadeInShare = () => {
    Animated.timing(fadeShare, {
      toValue: 0.5,
      //duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutShare = () => {
    Animated.timing(fadeShare, {
      toValue: 0,
      duration: 1250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={StyleAnimation.AnimationContainer}>
      <Animated.View
        style={[
          StyleAnimation.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeShare,
          },
        ]}
      >
        <View
          style={{
            backgroundColor: colors.charcoal,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppText
            style={{
              color: colors.white,
              fontSize: 16,
              fontWeight: "bold",
              paddingTop: 15,
              paddingBottom: 15,
              paddingRight: 20,
              paddingLeft: 20,
            }}
          >
            Sent
          </AppText>
        </View>
      </Animated.View>
    </View>
  );
});
export default ShareAnimation;
