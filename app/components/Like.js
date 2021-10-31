import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";

import PropTypes from "prop-types";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { colors } from "../config/theme";
import Numbers from "./Numbers";

const Like = ({ color, handleLike, isLiked, numberOfLikes, hSize, tSize }) => {
  const likeColor = isLiked === true ? colors.red : colors.white;

  const likeSize = hSize;

  const textSize =
    tSize === "sm" ? 10 : tSize === "lg" ? 16 : tSize === "md" ? 13 : 13;

  const text = {
    color: color,
    fontSize: textSize,
  };

  return (
    <TouchableWithoutFeedback onPress={handleLike}>
      <View style={styles.likes}>
        <FontAwesome name="heart" size={likeSize} color={likeColor} />
        <Text style={text}>
          <Numbers number={numberOfLikes} />
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  likes: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});

Like.defaultProps = {
  opacity: false,
  hSize: 35,
  tSize: "md",
  color: colors.white,
};

Like.propTypes = {
  handleLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  postLikeNumber: PropTypes.number,
  opacity: PropTypes.bool,
  color: PropTypes.string,
  sSize: PropTypes.number,
  tSize: PropTypes.string,
  textShadow: PropTypes.bool,
};

export default Like;
