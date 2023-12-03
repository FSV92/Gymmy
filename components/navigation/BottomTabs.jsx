import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import CurrentNavigationTab from "./CurrentNavigationTab";
import SavedNavigationTab from "./SavedNavigationTab";

const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name="CurrentNavigationTab" component={CurrentNavigationTab} options={{ title: "Тренировочные дни" }} />
      <BottomTab.Screen name="SavedNavigationTab" component={SavedNavigationTab} options={{ title: "Сохраненные тренировки" }} />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
