import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
export const Category = ({ item, openItem, arrid }) => {
  return (
    <TouchableOpacity onPress={() => openItem(item, arrid)}>
      <View style={styles.container}>
        <ImageBackground source={item.img} style={styles.image} />
        <View style={styles.text}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3,
    padding: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: SCREEN_WIDTH / 3,

    shadowColor: "#520861",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 10,
  },
  text: {
    backgroundColor: "#f4f3f5",
    paddingVertical: 5,
    alignItems: "center",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.53,
      shadowRadius: 13.97,
  
      elevation: 10,
  },
  title: {
    color: "black",
    fontSize: SCREEN_WIDTH / 27,
    fontFamily: "Satisfy",
    textAlign: "center",
  },
});
