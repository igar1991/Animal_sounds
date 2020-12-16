import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import Slider from "@react-native-community/slider";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Picker } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { DATA } from "../DATA";

const { width: DEVICE_WIDTH } = Dimensions.get("window");

export const SoundScreen = ({ navigation, route }) => {
  const [soundCurrent, setSoundCurrent] = useState(null);
  const [curtime, setCurtime] = useState(0);
  const [isplay, setIsplay] = useState(false);

  const { itemID, arrID } = route.params;
  const itemarr = DATA.find((item) => item.id === arrID);
  const mainitem = itemarr.arr.find((item) => item.id === itemID);

  const Cchildren = ({ remainingTime, animatedColor }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <Animated.Text style={{ ...styles.remainingTime, color: animatedColor }}>
        {`${minutes}:${seconds}`}
      </Animated.Text>
    );
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
    Play(true);
    setIsplay(false);
  }, []);

  const Play = async (playing) => {
    const { sound, status } = await Audio.Sound.createAsync(mainitem.sound, {
      shouldPlay: playing,
      volume: 1.0,
      isLooping: true,
    });
    setSoundCurrent(sound);
    const unsubscribe = navigation.addListener("transitionStart", (e) => {
      sound.stopAsync();
    });

    return unsubscribe;
  };

  const Pause = () => {
    if (soundCurrent !== null) {
      soundCurrent.pauseAsync();
      setIsplay(true);
    }
  };

  const Plaing = () => {
    if (soundCurrent !== null) {
      soundCurrent.playAsync();
      setIsplay(false);
    }
  };

  const Volume = (value) => {
    if (soundCurrent !== null) {
      soundCurrent.setVolumeAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={mainitem.img} style={styles.image}>
        <View style={styles.footer}>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            {isplay ? (
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.1)"
                onPress={Plaing}
              >
                <AntDesign
                  name="playcircleo"
                  size={DEVICE_WIDTH * 0.25}
                  color="#520861"
                />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.1)"
                onPress={Pause}
              >
                <AntDesign
                  name="pausecircleo"
                  size={DEVICE_WIDTH * 0.25}
                  color="#520861"
                />
              </TouchableHighlight>
            )}
          </View>

          <View style={styles.buttonsContainerBase}>
            <AntDesign
              name="sound"
              size={DEVICE_WIDTH * 0.15}
              color="#520861"
            />
            <Slider
              style={{
                width: DEVICE_WIDTH * 0.6,
                height: 40,
                color: "#520861",
              }}
              value={1}
              onValueChange={Volume}
              minimumValue={0}
              maximumValue={1}
              thumbTintColor="#520861"
              minimumTrackTintColor="#520861"
              maximumTrackTintColor="#000000"
            />
          </View>
          <View style={styles.buttonsContainerBase}>
            {curtime === 0 ? (
              <MaterialCommunityIcons
                name="timer-off"
                size={DEVICE_WIDTH * 0.15}
                color="#520861"
              />
            ) : (
              <CountdownCircleTimer
                key={curtime}
                isPlaying
                size={DEVICE_WIDTH * 0.15}
                strokeWidth={5}
                duration={curtime}
                colors="#520861"
                onComplete={() => {
                  if (curtime !== 0) {
                    soundCurrent.pauseAsync();
                  }
                  setIsplay(true);
                  setCurtime(0);

                  return [false, 0];
                }}
                children={Cchildren}
              />
            )}

            <Picker
              note
              mode="dropdown"
              style={{ color: "black", marginLeft: 40 }}
              selectedValue={curtime}
              onValueChange={(value) => {
                setCurtime(value);
              }}
            >
              <Picker.Item label="Нет таймера" value="0" />
              <Picker.Item label="1 минута" value="60" />
              <Picker.Item label="5 минут" value="300" />
              <Picker.Item label="10 минут" value="600" />
              <Picker.Item label="15 минут" value="900" />
              <Picker.Item label="20 минут" value="1200" />
              <Picker.Item label="30 минут" value="1800" />
              <Picker.Item label="60 минут" value="3600" />
            </Picker>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  footer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginLeft: 10,
    marginRight: 10,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
    paddingLeft: 25,
  },
  buttonsContainerBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  remainingTime: {
    fontSize: DEVICE_WIDTH * 0.05,
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
