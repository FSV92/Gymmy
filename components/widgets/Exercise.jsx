import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function Exercise(props) {
   const { exercise } = props;

   console.log(exercise);
   return (
      <View
         style={{
            flexDirection: "row",
            width: "100%",
            flex: 1,
            borderWidth: 1,
            borderColor: "grey",
            marginBottom: 10,
            borderRadius: 10,
            overflow: "hidden",
         }}
      >
         <View style={{ flex: 1 }}>
            <TextInput style={styles.textInput}>{exercise.name}</TextInput>
            <TextInput style={styles.textInput}>{exercise.description}</TextInput>
         </View>
         {approaches.map((el) => (
            <TextInput style={[styles.textInput, { flex: 1 }]}>{el}</TextInput>
         ))}
      </View>
   );
}

const styles = StyleSheet.create({
   textInput: {
      borderWidth: 0.5,
      borderColor: "grey",
   },
});
