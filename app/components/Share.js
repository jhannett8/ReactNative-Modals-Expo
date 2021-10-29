import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { colors } from "../../config/theme";
import AppText from "../dataDisplays/AppText";
import Avatar from "../dataDisplays/Avatar";

function Share({ item, onSelect }) {
  const [isSelected, setIsSelected] = useState(item.isItemSelected);

  const handlePress = () => {
    onSelect(item);
    setIsSelected((prevSelect) => !prevSelect);
    if (isSelected == true) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => handlePress()}>
        <View style={styles.shareContainer}>
          <View style={styles.avatarContainer}>
            <Avatar size="xs" image={item.image} />
            <View style={{ justifyContent: "center" }}>
              <AppText style={styles.handle}>{item.handle}</AppText>
              <AppText style={styles.level}>Level {item.level}</AppText>
            </View>
          </View>
          <View
            style={{
              height: "100%",
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: isSelected ? colors.blue : "transparent",
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: colors.lightGrey,
              }}
            ></View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.separator} />
    </>
  );
}
const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  shareContainer: {
    flexDirection: "row",
    height: 60,
    paddingTop: 3,
    backgroundColor: colors.charcoal,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGrey,
    opacity: 0.2,
    margin: 3,
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 20,
    width: 41,
    height: 41,
    margin: 10,
  },
  handle: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    paddingBottom: 2,
  },
  level: {
    color: "white",
    fontWeight: "400",
    fontSize: 14,
  },
});

export default Share;
