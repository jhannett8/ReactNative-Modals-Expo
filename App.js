import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
//Animations
import ShareAnimation from "./app/animations/ShareAnimation";
import SaveAnimation from "./app/animations/SaveAnimation";
import ReportAnimation from "./app/animations/ReportAnimation";
import InterestAnimation from "./app/animations/InterestAnimation";
//Modals
import CommentModal from "./app/modals/CommentModal";
import ShareModal from "./app/modals/ShareModal";
import GenericModal from "./app/modals/GenericModal";

export default function App() {
  //Comment State Variables
  const [numberOfComments, setNumberOfComments] = useState(23);
  //Save State Variables
  const [isSaved, setIsSaved] = useState(false);
  const [numberOfSaves, setNumberOfSaves] = useState(34);
  //Share State Variables
  const [numberOfSends, setNumberOfSends] = useState(105);
  //Modals
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);
  //Animations
  const animationSaveRef = useRef();
  const animationShareRef = useRef();
  const animationReportRef = useRef();
  const animationInterestRef = useRef();

  const handleSave = () => {
    // API CALL
    setIsSaved((prevSave) => !prevSave);
    if (isSaved == true) {
      setNumberOfSaves(numberOfSaves - 1);
      setIsSaved(false);
      saveAnimation();
    } else {
      setNumberOfSaves(numberOfSaves + 1);
      setIsSaved(true);
      saveAnimation();
    }
  };

  const handleSend = () => {
    setNumberOfSends(numberOfSends + 1);
    setIsShareVisible(!isShareVisible);
    shareAnimation();
  };

  const handleReport = () => {
    reportAnimation();
  };

  const handleInterest = () => {
    interestAnimation();
  };

  const reportAnimation = () => {
    if (animationReportRef.current) {
      animationReportRef.current.reportAnimation();
    }
  };

  const interestAnimation = () => {
    if (animationInterestRef.current) {
      animationInterestRef.current.interestAnimation();
    }
  };

  const saveAnimation = () => {
    if (animationSaveRef.current) {
      animationSaveRef.current.saveAnimation();
    }
  };

  const shareAnimation = () => {
    if (animationShareRef.current) {
      animationShareRef.current.shareAnimation();
    }
  };

  return (
    <View style={styles.container}>
      {/* Icons */}
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
      {/* Animations */}
      <SaveAnimation
        ref={animationSaveRef}
        text={isSaved ? "Saved" : "Unsaved"}
      />
      <ShareAnimation ref={animationShareRef} />
      <ReportAnimation ref={animationReportRef} />
      <InterestAnimation ref={animationInterestRef} />
      {/* Modals*/}
      <CommentModal
        userId={postData.user.userId}
        setIsCommentVisible={setIsCommentVisible}
        isCommentVisible={isCommentVisible}
        setNumberOfComments={setNumberOfComments}
        numberOfComments={numberOfComments}
      />
      <ShareModal
        isShareVisible={isShareVisible}
        setIsShareVisible={setIsShareVisible}
        handleSend={handleSend}
      />
      <GenericModal
        ismodalVisible={isModalVisible}
        isSaved={isSaved}
        setIsModalVisible={setIsModalVisible}
        setIsShareVisible={setIsShareVisible}
        setIsCommentVisible={setIsCommentVisible}
        setIsSaved={setIsSaved}
        handleSave={handleSave}
        handleReport={handleReport}
        handleInterest={handleInterest}
      />
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
