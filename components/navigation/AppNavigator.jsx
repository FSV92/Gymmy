import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabs from "./BottomTabs";

const AppNavigator = () => {
  const RootStackNavigator = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <RootStackNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStackNavigator.Screen
          name="BottomTabs"
          component={BottomTabs}
          // screenOptions={{headerShown: false}}
        />
      </RootStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
