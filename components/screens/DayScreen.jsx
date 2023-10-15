import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

import DaysStore from "../../stores/DaysStore";
import Exercise from "../widgets/Exercise";

const DayScreen = observer(() => {
   const navigation = useNavigation();
   const route = useRoute();
   const { day } = route.params;

   useEffect(() => {
      navigation.setOptions({ title: day.date });

      // console.log(DaysStore.days);

      // DaysStore.days.map((el) => console.log(el.exercises));
   }, []);

   const addExercise = () => {
      DaysStore.setExercise(day);
   };

   // console.log(day.exercises);

   return (
      <View style={{ flex: 1, backgroundColor: "white", paddingVertical: 20 }}>
         <ScrollView>
            {day.exercises
               .slice()
               .reverse()
               .map((exercise) => (
                  <Exercise key={exercise.id} exercise={exercise} />
               ))}
         </ScrollView>

         <TouchableOpacity
            onPress={addExercise}
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
            }}
         >
            <Text style={{ color: "white" }}>Добавить упр</Text>
         </TouchableOpacity>
      </View>
   );
});

export default DayScreen;
