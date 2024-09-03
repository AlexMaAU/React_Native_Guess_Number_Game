import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import StartGameScreen from "./screens/StartGameScreen";

import backGroundImg from "./assets/images/background.png";
import { useEffect, useRef, useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";

// 保持启动画面可见
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [logs, setLogs] = useState([]);

  const userNumberRef = useRef(null);
  const logsRef = useRef(null);

  useEffect(() => {
    userNumberRef.current = userNumber;
    logsRef.current = logs;
  }, [userNumber, logs]);

  // 加载外部字体
  const [fontsLoaded, error] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // 字体加载成功后关闭启动画面
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !error) {
    return null;
  }

  function handlePickedNumber(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  function handleResetUserNumber() {
    setUserNumber("");
  }

  function handleGameOver() {
    setGameOver(true);
  }

  function handleStartGame() {
    setGameOver(false);
  }

  let screen = <StartGameScreen handlePickedNumber={handlePickedNumber} />;

  if (userNumber && !gameOver) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        handleResetUserNumber={handleResetUserNumber}
        handleGameOver={handleGameOver}
        logs={logs}
        setLogs={setLogs}
      />
    );
  }

  if (gameOver) {
    screen = (
      <GameOverScreen
        handleStartGame={handleStartGame}
        userNumber={userNumberRef.current}
        roundsNumber={logsRef.current.length}
      />
    );
  }

  return (
    <>
      {/* 状态栏是设备屏幕顶部的区域，通常显示系统信息，如时间、电池状态、信号强度等 */}
      {/* 可以通过设置style为light或者dark来更改状态栏的颜色为白色或者黑色，也可以通过hidden来隐藏状态栏 */}
      <StatusBar style="light" hidden />
      {/* LinearGradient用来给包裹的组件背景添加渐变色效果，可以替换View使用 */}
      {/* LinearGradient里colors数组表示渐进色的变化，从第一个颜色到第二个颜色 */}
      <LinearGradient
        colors={[Colors.primary700, Colors.buttonColor]}
        style={styles.rootScreen}
      >
        {/* ImageBackground用来给包裹的组件添加背景图片 */}
        <ImageBackground
          source={backGroundImg}
          resizeMode="cover"
          style={styles.backGroundStyle} // 用于 ImageBackground 组件自身的样式, ImageBackground组件本身是<View><Image/></View>的形式，所以要分别对View和Image进行设置
          imageStyle={styles.backgroundImage} // 用于设置背景图片的样式
        >
          {/* SafeAreaView 是 React Native 提供的一个组件，用于确保在不同设备屏幕上的内容不会被屏幕的非显示区域（如刘海、边角圆角、虚拟导航条等）遮挡。这个组件可以帮助你创建一个在不同屏幕尺寸和屏幕设计上都能适当展示内容的用户界面 */}
          <SafeAreaView style={styles.safeArea}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: Colors.buttonColor,
  },
  backGroundStyle: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  safeArea: {
    flex: 1,
  },
});

