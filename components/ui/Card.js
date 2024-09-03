import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary400,
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // add shadow for android
    elevation: 4,
    // add shadow for ios
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

