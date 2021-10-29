import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";

import { colors } from "../../config/theme";

function GenericModal({
  ismodalVisible,
  isSaved,
  setIsModalVisible,
  setIsShareVisible,
  setIsCommentVisible,
  handleSave,
  handleReport,
  handleInterest,
  onNavigationBook,
}) {
  const insets = useSafeAreaInsets();
  const topFlex = 1;
  const bottomFlex = 1;

  handleSaveEvent = () => {
    setIsModalVisible(!ismodalVisible);
    handleSave();
  };
  handleReportPostEvent = () => {
    setIsModalVisible(!ismodalVisible);
    handleReport();
  };
  handleInterestEvent = () => {
    setIsModalVisible(!ismodalVisible);
    handleInterest();
  };
  handleShareEvent = () => {
    setIsModalVisible(!ismodalVisible);
    setIsShareVisible(true);
  };
  handleBookEvent = () => {
    setIsModalVisible(!ismodalVisible);
    onNavigationBook();
  };
  handleCommentEvent = () => {
    setIsModalVisible(!ismodalVisible);
    setIsCommentVisible(true);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={ismodalVisible}>
      <>
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        >
          <View style={{ flex: 1, opacity: 0.3 }} />
          <LinearGradient
            colors={["transparent", colors.black, colors.black]}
            style={{ flex: 1, opacity: 0.9 }}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => setIsModalVisible(!ismodalVisible)}
        >
          <View style={{ flex: topFlex }} />
        </TouchableWithoutFeedback>
        <View
          style={[
            {
              flex: bottomFlex,
              bottom: 0,
              marginHorizontal: 15,
              marginVertical: 15,
              backgroundColor: colors.charcoal,
              borderRadius: 10,
            },
          ]}
        >
          <View style={[{ flex: 1 }, styles.container]}>
            <View style={styles.modalView}>
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={handleReportPostEvent}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Text style={[styles.itemText, { color: colors.red }]}>
                    Report
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={handleInterestEvent}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Text style={[styles.itemText, { color: colors.red }]}>
                    Not Interested
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={handleBookEvent}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Text style={styles.itemText}>Book Experience</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={handleSaveEvent}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Text style={styles.itemText}>
                    {!isSaved ? "Save to Itinerary" : "Unsave from Itinerary"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={handleShareEvent}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Text style={styles.itemText}>Share With Friends</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={handleCommentEvent}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Text style={styles.itemText}>Add Comment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => setIsModalVisible(!ismodalVisible)}>
          <View
            style={[styles.cancelContainer, { marginBottom: insets.bottom }]}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGrey,
    opacity: 0.2,
    margin: 5,
  },
  itemText: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
  },
  itemContainer: {
    flex: 1,
  },
  cancelText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18,
  },
  cancelContainer: {
    height: 50,
    backgroundColor: colors.charcoal,
    flexDirection: "row",
    padding: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
GenericModal.propTypes = {
  setIsModalVisible: PropTypes.func.isRequired,
  setIsShareVisible: PropTypes.func.isRequired,
  setIsCommentVisible: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleReport: PropTypes.func.isRequired,
  handleInterest: PropTypes.func.isRequired,
  onNavigationBook: PropTypes.func.isRequired,
  ismodalVisible: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
};

export default GenericModal;
