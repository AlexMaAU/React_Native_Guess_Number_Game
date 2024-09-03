import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

function Name() {
  return <Text style={styles.text}>Android OS</Text>;
}

export default Name;

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    marginTop: 5,
  },
});

