import { StyleSheet, TextInput, View, Alert } from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "./InstructionText";

function StartGameScreen({ handlePickedNumber }) {
  const [input, setInput] = useState("");

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

  return (
    <View style={styles.screenContainer}>
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
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: 100,
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

