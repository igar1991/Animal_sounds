import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { DATA } from "../DATA";
import { Category } from "./Category";

export const MainScreen = ({ navigation }) => {
  const openItem = (item, arrid) => {
    navigation.navigate("SoundScreen", {
      itemID: item.id,
      arrID: arrid,
      nameTitle: item.title,
    });
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <FlatList
        numColumns={1}
        data={DATA}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={styles.title}>
                <Text style={styles.titletext}>{item.title}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                {item.arr.map((i) => {
                  return (
                    <Category
                      key={i.id}
                      item={i}
                      openItem={openItem}
                      arrid={item.id}
                    />
                  );
                })}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  title: {
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 10,
    paddingBottom: 5,
    borderColor: "#520861",
    borderBottomWidth: 1,
  },
  titletext: {
    fontSize: 25,
    fontFamily: "Satisfy",
  },
});
