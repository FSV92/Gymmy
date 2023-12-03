import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DaysScreen from "../screens/DaysScreen";
import DayScreen from "../screens/DayScreen";

export default function CurrentNavigationTab() {
  const Current = createNativeStackNavigator();

  return (
    <Current.Navigator>
      <Current.Screen name="DaysScreen" component={DaysScreen} options={{ title: "Тренировочные дни" }} />
      <Current.Screen name="DayScreen" component={DayScreen} options={{ title: "." }} />
    </Current.Navigator>
  );
}

const styles = StyleSheet.create({});
