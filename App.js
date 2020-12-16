import React, { useState } from "react";
import { MainScreen } from "./components/mainScreen";
import { SoundScreen } from "./components/soundScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/stack";
import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

const Stack = createStackNavigator();

export default function App() {
  const [ready, setReady] = useState(false);

  async function uploadFont() {
    try {
      await Font.loadAsync({
        Satisfy: require("./assets/Bangers-Regular.ttf"),
      });
      
      
    } catch (e) {
      comsole.log("errror", e);
    }
  }

  if (!ready) {
    return (
      <AppLoading
        startAsync={uploadFont}
        onFinish={() => setReady(true)}
        onError={console.log("warn")}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#520861" },
        }}
      >
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ title: "Sleep Sound" }}
        />
        <Stack.Screen
          name="SoundScreen"
          component={SoundScreen}
          options={({ route }) => ({
            title: route.params.nameTitle
            // headerLeft: (props) => (
            //   <HeaderBackButton
            //     {...props}
            //     onPress={() => {
            //       // Do something
            //       console.log("222222222");
            //     }}
            //   />
            // ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
