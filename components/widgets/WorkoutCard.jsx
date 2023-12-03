import { View, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from "react-native-reanimated";

import Input from "../elements/Input";
import ButtonDel from "../elements/ButtonDel";
import ButtonText from "../elements/ButtonText";
import AppColors from "../../globals/AppColors";

import DaysStore from "../../stores/DaysStore";
import WorkoutStore from "../../stores/WorkoutStore";

import { toJS } from "mobx";

// if (Platform.OS === "android") {
//   if (UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
//   }
// }
const screenWidth = Dimensions.get("screen").width;

const WorkoutCard = observer((props) => {
  const { workout, addStyle, index } = props;
  const repetitionsRefs = useRef({});
  const translateX = useSharedValue(screenWidth);

  translateX.value = withTiming(0, { duration: 300 });

  useEffect(() => {
    (async () => {
      await WorkoutStore.getRepetitionsFromSQL(workout.id);
    })();

    // return () => {
    //   translateX.value = withSpring(screenWidth, { duration: 300 });
    // };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const onAnimationComplete = () => {
    WorkoutStore.delWorkout(workout.id);
  };

  const delWorkout = () => {
    const duration = 300;
    translateX.value = withTiming(screenWidth, { duration });
    setTimeout(() => {
      onAnimationComplete();
    }, duration);
  };

  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          flex: 1,
          borderColor: "grey",
          overflow: "hidden",
          alignItems: "center",
          borderRadius: 8,
          backgroundColor: AppColors.lightgrey,
        },
        addStyle,
        animatedStyle,
      ]}>
      <View style={{ flex: 1, borderRightWidth: 3, borderColor: "white" }}>
        <Input
          col="name"
          workout={workout}
          placeholder="Название"
          inputProps={{ numberOfLines: 6, multiline: true, textAlignVertical: "top", autoFocus: workout.setFocus }}
          addStyles={{ paddingVertical: 10 }}
        />
      </View>

      <View style={{ flex: 1 }}>
        {workout.repetitions?.length > 0 &&
          workout.repetitions.map((repetition, index) => (
            <View
              key={repetition.id}
              style={{ flexDirection: "row", borderBottomWidth: workout.repetitions.length - 1 !== index ? 3 : 0, borderColor: "white" }}>
              <Input
                ref={(ref) => {
                  repetitionsRefs.current[`weight${index}`] = ref;
                }}
                wrapStyles={{ flex: 1 }}
                addStyles={{ borderRightWidth: 3, borderColor: "white" }}
                type="repetition"
                col="weight"
                workout={workout}
                id={repetition.id}
                placeholder="Вес"
                inputProps={{ keyboardType: "numeric" }}
                onSubmitEditing={() => {
                  repetitionsRefs?.current[`count${index}`]?.focus();

                  // console.log(repetitionsRefs?.current[`count${index}`]);
                }}
              />
              <Input
                ref={(ref) => {
                  // console.log();
                  repetitionsRefs.current[`count${index}`] = ref;
                }}
                wrapStyles={{ flex: 1 }}
                addStyles={{ borderColor: "grey" }}
                type="repetition"
                col="count"
                workout={workout}
                id={repetition.id}
                placeholder="Кол-во"
                inputProps={{ keyboardType: "numeric" }}
              />
            </View>
          ))}
      </View>

      {/* <ButtonText text="+" addStyle={{ position: "absolute", right: 5 }} /> */}
      <ButtonDel addStyle={{ position: "absolute", left: 5, bottom: 5 }} onPress={delWorkout} />

      {/* <Text>{workout.id}</Text> */}
    </Animated.View>
  );
});

export default WorkoutCard;
