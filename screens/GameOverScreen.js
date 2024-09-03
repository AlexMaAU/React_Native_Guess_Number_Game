import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import successImg from "../assets/images/success.png";
import Colors from "../constants/colors";

function GameOverScreen({ handleStartGame, userNumber, roundsNumber }) {
  return (
    <View style={styles.gameOverScreen}>
      <View style={styles.titleContainer}>
        <Title>Game Over</Title>
      </View>

      <View style={styles.imageContainer}>
        <Image source={successImg} style={styles.image} />
      </View>

      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={handleStartGame}>Start New Game</PrimaryButton>
      </View>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  gameOverScreen: {
    flex: 1,
    padding: 34,
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary700,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary600,
  },
  buttonContainer: {
    width: "100%",
  },
});

