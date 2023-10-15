import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DaysScreen from "../screens/DaysScreen";
import DayScreen from "../screens/DayScreen";

export default function RootNavigation() {
   const Root = createNativeStackNavigator();

   return (
      <NavigationContainer>
         <Root.Navigator>
            <Root.Screen name="DaysScreen" component={DaysScreen} options={{ title: "/" }} />
            <Root.Screen name="DayScreen" component={DayScreen} options={{ title: "." }} />
         </Root.Navigator>
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({});
