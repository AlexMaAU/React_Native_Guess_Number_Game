import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import Title from "../components/ui/Title";
import generateRandomNumber from "../utils/generateRandomNumber";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "./InstructionText";
import Colors from "../constants/colors";

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({
  userNumber,
  handleResetUserNumber,
  handleGameOver,
  logs,
  setLogs,
}) {
  const initialGuess = generateRandomNumber(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (userNumber === currentGuess) {
      handleRestart();
      handleGameOver();
    }
  }, [currentGuess]);

  function handleNextGuess(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      return Alert.alert("Dont lie", "You know this is wrong", [
        { text: "Sorry", style: "cancel" },
      ]);
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess;
    }
    const newGuess = generateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newGuess);
    setLogs([
      ...logs,
      `Round: ${logs.length + 1}  Opponent's guess of ${currentGuess}`,
    ]);
  }

  function handleRestart() {
    handleResetUserNumber();
    minBoundary = 1;
    maxBoundary = 100;
    rounds = 0;
    setCurrentGuess("");
    setLogs([]);
  }

  return (
    <View style={styles.gameScreen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <InstructionText style={styles.instructionText}>
        Higher or Lower?
      </InstructionText>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => handleNextGuess("higher")}>
            Higher
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => handleNextGuess("lower")}>
            Lower
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={handleRestart}>Restart</PrimaryButton>
        </View>
      </View>

      <View style={styles.logContainer}>
        <FlatList
          keyExtractor={(item) => item}
          data={logs}
          renderItem={(itemData) => (
            <Text style={styles.logText}>{itemData.item}</Text>
          )}
          showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
          showsHorizontalScrollIndicator={false} // 隐藏水平滚动条
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    padding: 34,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  buttonContainer: {
    flex: 1,
  },
  logContainer: {
    flex: 1,
  },
  logText: {
    color: Colors.primary700,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 25,
    padding: 10,
    marginBottom: 8,
    borderColor: Colors.primary600,
    backgroundColor: Colors.buttonColor,
    // 设置安卓阴影
    elevation: 4,
    // 设置IOS阴影
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});

