import { StyleSheet, Text, Pressable, View } from "react-native";
import Colors from "../../constants/colors";

export default function PrimaryButton({ children, onPress }) {
  return (
    // Pressable 是在 React Native 0.63 中引入的一个更为通用的组件，旨在替代 Touchable 系列组件，提供更灵活的触摸反馈和更好的性能优化
    // Pressable的通用局部方式，把Pressable包裹在View里面，不要把Pressable作为最外层组件，否则设置ripple effect的时候会出现问题
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }} // for android ripple effect
        // style可以直接传一个style对象，也可以传递一个回调函数
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.iosRipple] // React Native里可以通过数组传入多个style样式，React Native会使用全部的样式
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 25,
    margin: 4,
    overflow: "hidden", // 确保ripple effect不会溢出
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary700,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // add shadow for android
    elevation: 2,
    // add shadow for ios
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  // 设置IOS的ripple effect样式
  iosRipple: {
    opacity: 0.75,
  },
});

