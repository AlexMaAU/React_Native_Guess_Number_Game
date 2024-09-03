import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

function InstructionText({ children, style }) {
  return (
    <View>
      {/* custom style for reuseable component，通过数组形式实现，override default style */}
      <Text style={[styles.instructionText, style]}>{children}</Text>
    </View>
  );
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.buttonColor,
    fontSize: 24,
    textAlign: "center",
  },
});

