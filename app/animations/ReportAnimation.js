import React, { useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

import { colors } from "../../config/theme";
import AppText from "../dataDisplays/AppText";
import StyleAnimation from "./StyleAnimation";

ReportAnimation = React.forwardRef(({}, ref) => {
  const fadeReport = useRef(new Animated.Value(0)).current;

  React.useImperativeHandle(ref, () => ({
    reportAnimation,
  }));

  handleUndoEvent = () => {
    //console.log("Undo");
  };

  const reportAnimation = () => {
    fadeInReport();
    setTimeout(() => {
      fadeOutReport();
    }, 3000);
  };

  const fadeInReport = () => {
    Animated.timing(fadeReport, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutReport = () => {
    Animated.timing(fadeReport, {
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
            opacity: fadeReport,
          },
        ]}
      >
        <View style={styles.container}>
          <AppText style={styles.text}>This post has been flagged.</AppText>
          <AppText style={styles.text}>
            Loop Experience, Inc. has been notified.
          </AppText>
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

export default ReportAnimation;
