import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import DaysScreen from "./components/screens/DaysScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import AppNavigator from "./components/navigation/AppNavigator";
import * as Updates from "expo-updates";

import { useEffect } from "react";

export default function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // // You can also add an alert() to see the error message in case of an error when fetching updates.
      // alert(`Error fetching latest Expo update: ${error}`);
    }
  }
  useEffect(() => {
    (async () => {
      onFetchUpdateAsync();
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.select(__DEV__ ? { ios: "height", android: null } : { ios: "padding", android: null })}
        style={{
          flex: 1,
        }}
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: StatusBar.currentHeight || 0,
        })}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <View
              style={{
                padding: 10,
                flex: 1,
                alignItems: "stretch",
                marginTop: Platform.select({
                  ios: 0,
                  android: 20,
                }),
              }}>
              <AppNavigator />
            </View>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
