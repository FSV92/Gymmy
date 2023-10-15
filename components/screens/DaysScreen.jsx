import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import DaysStore from "../../stores/DaysStore";
import DatabaseStore from "../../stores/DatabaseStore";
import Day from "../widgets/Day";

const DaysScreen = observer(() => {
  // const [days, setDays] = useState([]);

  useEffect(() => {
    (async () => {
      await DaysStore.getFromSQL();
    })();
  }, []);

  // useEffect(() => {
  //    console.log("use");
  // }, [DaysStore.days]);

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingVertical: 20 }}>
      {/* {console.log("re", days)} */}
      <View style={{ flex: 1 }}>
        {DaysStore.days.length > 0 ? (
          <ScrollView>
            {DaysStore.days
              .slice()
              .reverse()
              .map((day) => {
                return <Day key={day.id} day={day} />;
              })}
          </ScrollView>
        ) : (
          <>
            <Text>Пусто</Text>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={DaysStore.addDay}
        style={{
          // position: "absolute",
          bottom: 0,
          // right: 5,
          borderRadius: 25,
          borderColor: "green",
          borderWidth: 3,
          paddingVertical: 7,
          paddingHorizontal: 10,
          backgroundColor: "green",
          zIndex: 100,
          alignItems: "center",
        }}>
        <Text style={{ color: "white" }}>Добавить тренировку</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={DaysStore.deleteAll}
        style={{
          // position: "absolute",
          bottom: 0,
          // right: 5,
          borderRadius: 25,
          borderColor: "orange",
          borderWidth: 3,
          paddingVertical: 7,
          paddingHorizontal: 10,
          backgroundColor: "orange",
          zIndex: 100,
          alignItems: "center",
          marginTop: 20,
        }}>
        <Text style={{ color: "white" }}>Удалить все тренировки</Text>
      </TouchableOpacity>
    </View>
  );
});

export default DaysScreen;
