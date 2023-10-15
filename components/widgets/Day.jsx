import { TouchableOpacity, Text } from "react-native";
import React from "react";

import DaysStore from "../../stores/DaysStore";
import { useNavigation } from "@react-navigation/native";

export default function Day(props) {
  const { day, delDay, setDays } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DayScreen", {
          // title: day.date,
          day: day,
        })
      }
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "grey",
        padding: 20,
        marginBottom: 10,
        zIndex: 100,
      }}>
      <Text>{day.id}</Text>
      <Text>{day.date}</Text>

      <TouchableOpacity onPress={() => DaysStore.delDay(day.id)} style={{ borderRadius: 5, borderColor: "lightgrey", borderWidth: 1, padding: 7 }}>
        <Text>Удалить</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
