import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DaysStore from "../../stores/DaysStore";
import WorkoutStore from "../../stores/WorkoutStore";
import EditIcon from "../../assets/icons/EditIcon";

const Input = React.forwardRef((props, ref) => {
  const { addStyles, col, workout, type, id, placeholder, wrapStyles, inputProps, onSubmitEditing } = props;
  const [value, setValue] = useState(null);
  const navigation = useNavigation();

  const valFromDB = type == "repetition" ? workout.repetitions?.find((el) => el.id == id)[col] : workout[col];

  const computedValue = value === null ? value || valFromDB : value;

  // useEffect(() => {
  //   const beforeRemoveListener = navigation.addListener("beforeRemove", () => {
  //     console.log("beforeRemoveListener");
  //   });

  //   return () => {
  //     beforeRemoveListener.remove();
  //   };
  // }, []);

  const updateCol = () => {
    if (type == "repetition") {
      WorkoutStore.updateCol("repetitions", id, col, computedValue);
    } else {
      WorkoutStore.updateCol("workouts", workout.id, col, computedValue);
    }
  };

  const onChangeHandler = (val) => {
    setValue(val);

    let changeObj;
    if (type == "repetition") {
      changeObj = { type: "repetitions", id: id, col, val };
    } else {
      changeObj = { type: "workouts", id: workout.id, col, val };
    }

    WorkoutStore.setLastChanged(changeObj);
  };

  // type == "repetition" && console.log("workout.repetitions", id, workout.repetitions.find((el) => el.id == id)[col]);

  return (
    <View style={[wrapStyles]}>
      <TextInput
        ref={ref}
        value={computedValue}
        onChangeText={onChangeHandler}
        //   onChange={(e) => setValue(console.log(e.value))}
        placeholder={placeholder || "!"}
        style={[styles.textInput, addStyles]}
        // onBlur={updateCol}
        onBlur={WorkoutStore.updateColLoseFocus}
        onEndEditing={() => console.log("onEndEditing")}
        {...inputProps}
        onSubmitEditing={onSubmitEditing}
      />

      {(!value || !valFromDB) && <EditIcon width={10} height={10} style={{ position: "absolute", right: 5, top: 5 }} color="lightgrey" />}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 7,
    // borderWidth: 0.5,
    // borderColor: "grey",
  },
});
