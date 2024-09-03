import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import successImg from "../assets/images/success.png";
import Colors from "../constants/colors";

function GameOverScreen({ handleStartGame, userNumber, roundsNumber }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 220;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.gameOverScreen}>
        <View style={styles.titleContainer}>
          <Title>Game Over</Title>
        </View>

        <View style={[styles.imageContainer, imageStyle]}>
          <Image source={successImg} style={styles.image} />
        </View>

        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>

        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={handleStartGame}>
            Start New Game
          </PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  gameOverScreen: {
    flex: 1,
    padding: 34,
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    marginTop: 40,
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 220 : 300,
    // height: deviceWidth < 380 ? 220 : 300,
    // borderRadius: deviceWidth < 380 ? 110 : 150,
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
    width: "60%",
  },
});

