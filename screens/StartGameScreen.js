import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "./InstructionText";

function StartGameScreen({ handlePickedNumber }) {
  const [input, setInput] = useState("");

  // 如果想要在手机横竖屏幕切换的时候每次都会自动调整style，需要使用useWindowDimensions钩子来实现
  // 为什么不能直接在StyleSheet中通过Dimensions定义？因为整个JS文件只在页面加载时执行一次，一旦执行完成，Dimensions.get("window").width获得的值不会再随着屏幕横竖切换而改变
  // 而JS中的component定义部分时会在变量更改时重新渲染的，所以要组件中通过useWindowDimensions来实时获取当前的宽高
  // 简单记忆：
  // 1. Dimensions.get("window")只适用于不需要随着屏幕旋转而改变的条件性样式
  // 2. useWindowDimensions钩子适用于设置需要随着屏幕旋转而改变的条件性样式
  const { width, height } = useWindowDimensions();

  function handleInput(text) {
    // 过滤非数字字符并检查长度
    const numericValue = text.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setInput(""); // 处理空字符串
    } else {
      setInput(numericValue); // 更新输入值
    }
  }

  function handleReset() {
    setInput("");
  }

  function handleConfirm() {
    const chosenNumber = parseInt(input);

    // 第一个参数："Incorrect input"，这是对话框的标题。
    // 第二个参数："Number has to be a number between 0 and 99"，这是对话框的内容/消息。
    // 第三个参数：这是一个按钮的配置数组。每个按钮都是一个对象。
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show alert
      return Alert.alert(
        "Incorrect input",
        "Number has to be a number between 0 and 99",
        [{ text: "Okay", style: "destructive", onPress: handleReset }] // text: "Okay"：按钮上的文本, style: "destructive"：按钮的样式, onPress: handleReset：当用户点击这个按钮时触发的回调函数
      );
    }

    // 切换App.js中的渲染组件
    handlePickedNumber(chosenNumber);
  }

  const marginTop = height < 380 ? 40 : 100;

  return (
    // 将 ScrollView 包裹在 KeyboardAvoidingView 组件内是一个常见的做法，尤其是在处理长表单或输入界面时。这样做的主要目的是为了确保在键盘弹出时，用户能够滚动查看被键盘遮挡的内容。
    <ScrollView style={styles.screen}>
      {/* KeyboardAvoidingView 是 React Native 提供的一个组件，用于在键盘弹出时自动调整视图的位置，以确保输入字段不会被键盘遮挡 */}
      {/* 同时KeyboardAvoidingView还提供点击键盘外部，会关闭输入键盘的功能 */}
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.screenContainer, { marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              keyboardType="number-pad" // 打开数字键盘
              style={styles.textInput}
              value={input}
              onChangeText={handleInput} // 使用自定义输入处理
            />
            <View style={styles.buttonsContainer}>
              {/* 把PrimaryButton分别再套入View组件里，然后把View组件设置为Flex:1，这样就可以实现自动占据完整剩余空间，而不需要强制设定Button的宽度，可以适应不同的设备屏幕大小 */}
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleReset}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleConfirm}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
  },
  instructionText: {
    color: Colors.buttonColor,
    fontSize: 26,
    fontWeight: "bold",
  },
  textInput: {
    height: 50,
    width: 80,
    fontSize: 32,
    borderBottomColor: Colors.buttonColor,
    borderBottomWidth: 2,
    color: Colors.buttonColor,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});

