import { Platform, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
// 注意：导入的文件路径中不用加上.android和.ios，React Native会自动分辨
import Name from "./Name"; // React Native会根据文件后缀中包含的.android和.ios来分别在不同系统环境中加载不同的文件

function Title({ children }) {
  return (
    <>
      <Text style={styles.title}>{children}</Text>
      <Name />
    </>
  );
}

export default Title;

// Platform.OS用来获取当前的操作系统环境，一般用来针对安卓或者IOS等不同系统环境进行不同的组件渲染或者样式设置
const isAndroid = Platform.OS === "android";

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    fontWeight: "bold",
    color: isAndroid ? Colors.buttonColor : Colors.white,
    textAlign: "center",
    borderWidth: Platform.select({ ios: 2, android: 3 }), // Platform.select可以对不同的系统环境设置不同的参数值(放在对象内)
    borderColor: isAndroid ? Colors.buttonColor : Colors.white,
    padding: 12,
  },
});

