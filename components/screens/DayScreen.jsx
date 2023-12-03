import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, BackHandler, TouchableWithoutFeedback } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

import DaysStore from "../../stores/DaysStore";
import WorkoutStore from "../../stores/WorkoutStore";

import WorkoutCard from "../widgets/WorkoutCard";

const DayScreen = observer(() => {
  const navigation = useNavigation();
  const route = useRoute();
  const { day } = route.params;

  useEffect(() => {
    DaysStore.setCurrentDay(day);
    WorkoutStore.getWorkoutsFromSQL(day);
    // WorkoutStore.createRepetitionsTable()

    // DatabaseStore.dropTable("workouts");
    // DatabaseStore.dropTable("days");
    navigation.setOptions({
      title: day.date,
      headerTitleStyle: { fontSize: 16, padding: 0, margin: 0 },
    });

    // обновление таблиц упражнений при нажатии назад
    navigation.addListener("beforeRemove", () => {
      WorkoutStore.updateColLoseFocus();
    });

    return () => {
      WorkoutStore.resetLastChanged();

      WorkoutStore.resetWorkouts();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingVertical: 20 }}>
      {/* <Text>{day.id}</Text> */}

      <View style={{ flex: 1 }}>
        {/* вывод упражнений */}
        {WorkoutStore.currentWorkouts.length > 0 ? (
          <ScrollView>
            {WorkoutStore.currentWorkouts.map((workout, index) => {
              return <WorkoutCard index={index} key={workout.id} workout={workout} addStyle={{ marginBottom: 10 }} />;
            })}
          </ScrollView>
        ) : (
          <>
            <Text>Пусто</Text>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={() => {
          WorkoutStore.addWorkout(day);
          WorkoutStore.setIsMountedCard();
        }}
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
        <Text style={{ color: "white" }}>Добавить упражнение</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={WorkoutStore.deleteAllWorkouts}
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
        <Text style={{ color: "white" }}>Удалить все упражнения</Text>
      </TouchableOpacity> */}
    </View>
  );
});

export default DayScreen;
