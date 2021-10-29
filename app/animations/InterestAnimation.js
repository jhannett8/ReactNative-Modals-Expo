import React, { useRef } from "react";
import { Animated, View, StyleSheet, Text } from "react-native";

import { colors } from "../../config/theme";
import StyleAnimation from "./StyleAnimation";

InterestAnimation = React.forwardRef(({}, ref) => {
  const fadeInterest = useRef(new Animated.Value(0)).current;

  React.useImperativeHandle(ref, () => ({
    interestAnimation,
  }));

  const interestAnimation = () => {
    fadeInInterest();
    setTimeout(() => {
      fadeOutInterest();
    }, 3000);
  };

  const fadeInInterest = () => {
    Animated.timing(fadeInterest, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutInterest = () => {
    Animated.timing(fadeInterest, {
      toValue: 0,
      duration: 2000,
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
            opacity: fadeInterest,
          },
        ]}
      >
        <View style={styles.container}>
          <Text style={styles.text}>Thank you for your input.</Text>
          <Text style={styles.text}>
            We will show fewer posts like this from now on.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 14,
  },
});

export default InterestAnimation;
