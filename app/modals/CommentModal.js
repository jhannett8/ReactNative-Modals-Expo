import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import { colors } from "../../config/theme";
import Numbers from "../components/Numbers";
import commentList from "../dataObjects/FeedObjects/CommentData";
import Comment from "../components/Comment";
import Avatar from "../components/Avatar";

function CommentModal({
  userId,
  isCommentVisible,
  setIsCommentVisible,
  numberOfComments,
  setNumberOfComments,
}) {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  const insets = useSafeAreaInsets();
  const flexAboveModal = 3;
  const flexOfModal = 7;

  const _getData = () => {
    const response = commentList;
    setList(response);
  };

  useEffect(() => {
    _getData();
  }, []);

  const handleChange = (value) => {
    setText(value);
  };

  const handleDelete = (comment) => {
    //Delete the Comment from the Comment Array
    const newCommentList = list.filter((c) => c.Id !== comment.Id);
    setList(newCommentList);
    //Call the Server
  };

  const handleSubmit = () => {
    const getCurrentDate = () => {
      var date = new Date().getDate(); //To get the Current Date
      var month = new Date().getMonth() + 1; //To get the Current Month
      var year = new Date().getFullYear(); //To get the Current Year
      var hours = new Date().getHours(); //To get the Current Hours
      var min = new Date().getMinutes(); //To get the Current Minutes
      var sec = new Date().getSeconds(); //To get the Current Seconds
      return "[" + year + ", " + month + ", " + date + "]";
    };

    setNumberOfComments(numberOfComments + 1);
    setList([
      {
        Id: 101,
        authorId: 123456,
        name: "Joseph Hannett",
        image: require("../../assets/FeedData/FeedImages/Hiker.jpg"),
        comment: text,
        numberOfLikes: 0,
        timeOfComment: "just now",
      },
      ...list,
    ]);
    setText(null);
    //const dateTimeAgo = moment("2020-04-04 11:45:26.123").fromNow();
    //console.log(dateTimeAgo); //> 6 minutes ago
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isCommentVisible}>
      {/* Touchable Space above Comment Modal to close Modal */}
      <TouchableWithoutFeedback
        onPress={() => setIsCommentVisible(!isCommentVisible)}
      >
        <View style={{ flex: flexAboveModal }} />
      </TouchableWithoutFeedback>

      {/* Comment Modal: Seperated by Header and Flalist (comments)  */}
      <View style={{ flex: flexOfModal }}>
        <View
          style={{
            marginBottom: 100 + insets.bottom,
            backgroundColor: colors.charcoal,
            borderRadius: 10,
          }}
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>
                <Numbers number={numberOfComments} /> comments
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => setIsCommentVisible(!isCommentVisible)}
            >
              <View style={styles.headerExit}>
                <Text style={styles.headerTitleText}>X</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.separator} />
          <FlatList
            data={list}
            keyExtractor={(list) => list.Id.toString()}
            renderItem={({ item }) => (
              <Comment item={item} handleDelete={handleDelete} />
            )}
          />
        </View>
      </View>

      {/* Input Feild to add Comment, Positioned at the bottom of the screen*/}
      {/* Independant from Parent Modal to allow for keyboard adjustment*/}
      <KeyboardAvoidingView behavior="position">
        <View
          style={[
            styles.commentInputContainer,
            { paddingBottom: insets.bottom },
          ]}
        >
          <Avatar size="xs" />
          <View style={styles.commentInputText}>
            <TextInput
              style={{
                width: "90%",
                color: colors.white,
                fontSize: 15,
                flex: 1,
                padding: 5,
              }}
              returnKeyType="done"
              placeholder="Add a commment..."
              placeholderTextColor={colors.white}
              multiline={true}
              onSubmitEditing={handleSubmit}
              onChangeText={handleChange}
              blurOnSubmit={true}
              value={text}
            />
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 45,
    flexDirection: "row",
  },
  headerExit: {
    right: 0,
    width: 50,
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGrey,
    opacity: 0.1,
    margin: 5,
  },
  commentInputContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    backgroundColor: colors.charcoal,
    paddingTop: 10,
  },
  commentInputText: {
    borderColor: colors.grey,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 10,
    padding: 6,
  },
});

CommentModal.propTypes = {
  setNumberOfComments: PropTypes.func.isRequired,
  setIsCommentVisible: PropTypes.func.isRequired,
  isCommentVisible: PropTypes.bool.isRequired,
  numberOfComments: PropTypes.number,
  userId: PropTypes.number,
  commentId: PropTypes.number,
};

export default CommentModal;
