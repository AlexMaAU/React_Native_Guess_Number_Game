import { Dimensions, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

// Dimensions API用来获取当前设备的宽高
// window表示不包含status bar在内的宽高，screen表示包含status bar在内的宽高
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.buttonColor,
    padding: deviceWidth < 380 ? 12 : 24, // 使用Dimensions API来给不同屏幕大小的设备设置不同的参数
    margin: deviceWidth < 380 ? 22 : 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.buttonColor,
    fontSize: deviceWidth < 380 ? 30 : 36,
    fontWeight: "bold",
  },
});

