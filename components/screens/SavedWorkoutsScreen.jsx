import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SavedWorkoutsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SavedWorkoutsScreen</Text>
    </View>
  );
};

export default SavedWorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
  },
});
