import React, { useRef } from "react";
import { Animated, View, Text } from "react-native";

import { colors } from "../../config/theme";
import StyleAnimation from "./StyleAnimation";

SaveAnimation = React.forwardRef(({ text }, ref) => {
  const fadeSave = useRef(new Animated.Value(0)).current;

  React.useImperativeHandle(ref, () => ({
    saveAnimation,
  }));

  const saveAnimation = () => {
    fadeInSave();
    setTimeout(() => {
      fadeOutSave();
    }, 1000);
  };

  const fadeInSave = () => {
    Animated.timing(fadeSave, {
      toValue: 0.5,
      //duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutSave = () => {
    Animated.timing(fadeSave, {
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
            opacity: fadeSave,
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
          <Text
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
            {text}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
});
export default SaveAnimation;
