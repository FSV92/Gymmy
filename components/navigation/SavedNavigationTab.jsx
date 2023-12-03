import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SavedWorkoutsScreen from "../screens/SavedWorkoutsScreen";

export default function SavedNavigationTab() {
  const Saved = createNativeStackNavigator();

  return (
    <Saved.Navigator>
      <Saved.Screen name="SavedWorkoutsScreen" component={SavedWorkoutsScreen} options={{ title: "Сохраненные тренировочные дни" }} />
    </Saved.Navigator>
  );
}

const styles = StyleSheet.create({});
