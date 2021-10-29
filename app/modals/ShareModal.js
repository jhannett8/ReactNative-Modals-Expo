import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Modal,
  Share,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PropTypes from "prop-types";

import { colors } from "../config/theme";
import ProfileList from "../dataObjects/FeedObjects/ProfileList";
import ShareComponent from "../components/Share";
import AppText from "../components/AppText";

function ShareModal({ isShareVisible, setIsShareVisible, handleSend }) {
  const [masterlist, setMasterList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [search, setSearch] = useState("");

  const insets = useSafeAreaInsets();
  const flexAboveModal = 3;
  const flexOfModal = 7;

  const _getData = () => {
    const response = ProfileList;
    setMasterList(response);
    const newList = response.map((element) => {
      const updatedItem = {
        ...element,
        isItemSelected: false,
      };
      return updatedItem;
    });
    setSelectedList(newList);
    setFilteredList(newList);
  };

  useEffect(() => {
    _getData();
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = selectedList.filter(function (item) {
        const itemData = item.handle
          ? item.handle.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.includes(textData);
      });
      setFilteredList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      setFilteredList(selectedList);
      setSearch(null);
    }
  };

  //When a user hits submit on the share modal
  const onSend = () => {
    handleSend(); //Defined in FeedVideoItem: Closes Modal and Initiates Animation
    //console.log(selectedList);
    setSearch(null); //Resets Search
    setSelectedList(masterlist); //Resets SelectedList
    setFilteredList(masterlist); //Resets FilteredList
  };

  const onKeyPress = (event) => {
    if (event.nativeEvent.key == "Enter") {
      //console.log("Enter");
    } else {
      //console.log("Something else Pressed");
    }
  };

  const onSubmitEditing = () => {
    Keyboard.dismiss();
  };

  //When a user selects a profile on the share modal
  const onSelect = (item) => {
    const newList = selectedList.map((element) => {
      if (item.Id == element.Id) {
        const updatedItem = {
          ...element,
          isItemSelected: !item.isItemSelected,
        };
        return updatedItem;
      } else return element;
    });
    setSelectedList(newList);
    setFilteredList(newList);
    setSearch(null);
  };

  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: "Loop Experiences Inc.",
          title: "Loop Experiences Inc",
          //url: require("../../assets/PostVideos/PhiPhiIslandsThailand.mp4"),
        },
        {
          excludedActivityTypes: [],
        }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isShareVisible}>
      {/*  Touchable Space above Share Modal to close Modal  */}
      <TouchableWithoutFeedback
        onPress={() => setIsShareVisible(!isShareVisible)}
      >
        <View style={{ flex: flexAboveModal }} />
      </TouchableWithoutFeedback>

      {/* Share Modal: Seperated by Header and Flalist (profiles)  */}
      <View style={{ flex: flexOfModal }}>
        <View
          style={[{ flex: 1, marginBottom: insets.bottom }, styles.container]}
        >
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <View style={styles.searchInputText}>
                <View style={{ paddingVertical: 5, paddingHorizontal: 7 }}>
                  <Icon name="search" fill={colors.white} size={17} />
                </View>
                <TextInput
                  style={styles.text}
                  returnKeyType="done" //ios
                  returnKeyLabel="done" //andriod
                  placeholder="Search"
                  placeholderTextColor={colors.white}
                  onChangeText={(text) => searchFilterFunction(text)}
                  value={search}
                  numberOfLines={1}
                  multiline={false}
                  onSubmitEditing={onSubmitEditing} //called only when multiline is false
                  //onKeyPress={onKeyPress} //called only when multiline is true
                />
              </View>
            </View>
            <TouchableWithoutFeedback onPress={onShare}>
              <View style={{ marginLeft: 10, marginTop: 3 }}>
                <FontAwesome
                  //name="person-add-outline"
                  name="share-square-o"
                  color={colors.white}
                  size={30}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({ item }) => (
              <ShareComponent item={item} onSelect={onSelect} />
            )}
          />
          <TouchableWithoutFeedback onPress={onSend}>
            <View style={styles.footerContainer}>
              <View style={styles.footerButton}>
                <AppText
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: colors.white,
                  }}
                >
                  SEND
                </AppText>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charcoal,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGrey,
    opacity: 0.1,
    margin: 5,
  },
  searchContainer: {
    flexDirection: "row",
    bottom: 0,
    backgroundColor: colors.charcoal,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputContainer: {
    width: "85%",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.grey,
  },
  searchInputText: {
    flexDirection: "row",
    padding: 3,
  },
  footerContainer: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  footerButton: {
    borderRadius: 12,
    height: "70%",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  text: {
    flex: 1,
    color: colors.white,
    fontSize: 17,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
});

ShareModal.propTypes = {
  isShareVisible: PropTypes.bool.isRequired,
  setIsShareVisible: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
};

export default ShareModal;
