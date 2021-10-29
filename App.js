import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { colors } from "./app/config/theme,";

export default function App() {
  //Modals
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);
  return (
    <View style={styles.container}>
      <>
        <View style={styles.iconContainer}>
          <TouchableWithoutFeedback onPress={() => setIsCommentVisible(true)}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="message" size={25} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(true)}>
            <View style={styles.icon}>
              <FontAwesome name="ellipsis-h" size={25} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setIsShareVisible(true)}>
            <View style={styles.icon}>
              <FontAwesome name="share" size={25} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <CommentModal
          userId={postData.user.userId}
          setIsCommentVisible={setIsCommentVisible}
          isCommentVisible={isCommentVisible}
          setNumberOfComments={setNumberOfComments}
          numberOfComments={numberOfComments}
        />
        {/* Modals*/}
        <ShareModal
          isShareVisible={isShareVisible}
          setIsShareVisible={setIsShareVisible}
          handleSend={handleSend}
        />
        <FeedModal
          ismodalVisible={isModalVisible}
          isSaved={isSaved}
          setIsModalVisible={setIsModalVisible}
          setIsShareVisible={setIsShareVisible}
          setIsCommentVisible={setIsCommentVisible}
          setIsSaved={setIsSaved}
          handleSave={handleSave}
          handleReport={handleReport}
          handleInterest={handleInterest}
          onNavigationBook={onNavigationBook}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 40,
  },
  icon: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
