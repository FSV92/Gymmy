import { TouchableOpacity, Text, Platform, UIManager, LayoutAnimation } from "react-native";
import React, { useEffect } from "react";

import DaysStore from "../../stores/DaysStore";
import { useNavigation } from "@react-navigation/native";

import ButtonDel from "../elements/ButtonDel";
import AppColors from "../../globals/AppColors";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function DayCard(props) {
  const { day, delDay, setDays } = props;
  const navigation = useNavigation();

  LayoutAnimation.configureNext({
    duration: 400,
    create: { type: "linear", property: "opacity" },
    update: { type: "spring", springDamping: 0.4 },
    delete: { type: "linear", property: "opacity" },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        // console.log(day);
        navigation.navigate("DayScreen", {
          // title: day.date,
          day: day,
        });
      }}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "grey",
        borderRadius: 10,
        backgroundColor: AppColors.lightgrey,
        padding: 20,
        marginBottom: 10,
        // zIndex: 100,
      }}>
      {/* <Text>{day.id}</Text> */}
      <Text style={{ fontSize: 14, fontFamily: "monospace" }}>{day.date}</Text>

      {/* <TouchableOpacity onPress={() => DaysStore.delDay(day.id)} style={{ borderRadius: 5, borderColor: "lightgrey", borderWidth: 1, padding: 7 }}>
        <Text>Удалить</Text>
      </TouchableOpacity> */}

      <ButtonDel onPress={() => DaysStore.delDay(day.id)} />
    </TouchableOpacity>
  );
}
