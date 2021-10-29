import React, { useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Like from "../inputs/Like";
import { colors } from "../../config/theme";
import AppText from "../dataDisplays/AppText";
import Numbers from "../dataDisplays/dataMasks/Numbers";

const ListItemDeleteAction = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.deleteContainer}>
        <MaterialCommunityIcons
          name="trash-can"
          size={25}
          color={colors.white}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

function Comment({ item, handleDelete }) {
  const [isLiked, setIsLiked] = useState(false);
  const [lastPress, setLastPress] = useState(0);
  const [numberOfLikes, setNumberOfLikes] = useState(item.numberOfLikes);
  const timeout = useRef();

  const handleLike = () => {
    // API CALL
    setIsLiked((prevLike) => !prevLike);
    if (isLiked == true) {
      setNumberOfLikes(numberOfLikes - 1);
      setIsLiked(false);
    } else {
      setNumberOfLikes(numberOfLikes + 1);
      setIsLiked(true);
    }
  };

  const onManualPress = async () => {
    const time = new Date().getTime();
    const delta = time - lastPress;
    const DOUBLE_PRESS_DELAY = 300;
    //Double Tap Event
    if (delta < DOUBLE_PRESS_DELAY) {
      handleLike();
      setLastPress(time);
      clearTimeout(timeout.current);
    }
    //Single Tap Event
    else {
      timeout.current = setTimeout(() => {}, DOUBLE_PRESS_DELAY);
      setLastPress(time);
    }
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <ListItemDeleteAction onPress={() => handleDelete(item)} />
      )}
      //enabled={id.user[0].name !== item.user[0].name ? true : false}
    >
      <TouchableWithoutFeedback onPress={onManualPress}>
        <View style={styles.commentContainer}>
          <View style={styles.avatarContainer}>
            <Image
              resizeMode="contain"
              style={styles.avatar}
              source={require("../../assets/FeedData/FeedImages/Hiker.jpg")}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text>
              <AppText style={styles.handle}>{item.name}</AppText>{" "}
              <AppText style={styles.text}>{item.comment}</AppText>
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                paddingTop: 5,
              }}
            >
              <Text style={{ width: 65 }}>
                <AppText style={styles.text}>{item.timeOfComment}</AppText>
              </Text>
              <AppText style={styles.text}>
                <Numbers number={numberOfLikes} /> Likes
              </AppText>
            </View>
          </View>
          <View style={styles.likeContainer}>
            <Like
              handleLike={handleLike}
              isLiked={isLiked}
              hSize={18}
              tSize="sm"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}
const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    paddingTop: 10,
    width: 40,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 5,
  },
  commentContainer: {
    flexDirection: "row",
    paddingBottom: 20,
    backgroundColor: colors.charcoal,
  },
  deleteContainer: {
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  likeContainer: {
    width: 60,
    height: 60,
    alignContent: "center",
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  handle: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  text: {
    color: colors.white,
    fontSize: 13,
  },
});
export default Comment;
