import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import DaysScreen from "./components/screens/DaysScreen";

import RootNavigation from "./components/navigation/RootNavigation";

export default function App() {
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
            })}
         >
            <View
               style={{
                  padding: 10,
                  flex: 1,
                  alignItems: "stretch",
                  marginTop: Platform.select({
                     ios: 0,
                     android: 20,
                  }),
               }}
            >
               <RootNavigation />
            </View>
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
