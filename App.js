import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RadioGroup from "react-native-radio-buttons-group";

export default function App() {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [selectedId, setSelectedId] = useState("1"); // Default selection

  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Yes",
        value: "like",
      },
      {
        id: "2",
        label: "No",
        value: "dislike",
      },
    ],
    []
  );

  const handleSubmit = () => {
    const selectedOption = radioButtons.find(
      (button) => button.id === selectedId
    )?.value;
    Alert.alert(
      "Summary",
      `My name is ${name}, I am ${age} years old. I ${selectedOption} coffee.`
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Your Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Your Age:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Enter age"
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Like coffee?</Text>
            <View style={styles.radioGroup}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
                layout="row" // Arrange radio buttons in a row
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 20,
  },
  row: {
    flexDirection: "row", // Arranges children in a row
    alignItems: "center", // Vertically aligns items in the row
    justifyContent: "flex-start", // Aligns items to the left
    width: "100%", // Ensures row takes full width
    paddingHorizontal: 20, // Adds padding for better alignment
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    width: 100, // Fixed width for labels to align inputs horizontally
    marginRight: 10, // Adds space between the label and the input
    marginLeft: 10,
    marginBottom: 20,
    textAlign: "left", // Aligns label text to the right
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    flex: 1, // Allows the input to take up remaining space
    marginRight: 10,
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: "row", // Arrange radio buttons in a row
    alignItems: "center", // Vertically aligns radio buttons
    marginTop: -20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
