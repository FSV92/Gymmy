import React from "react";
import { TouchableOpacity, Text } from "react-native";

const ButtonText = (props) => {
  const { onPress, addStyle, text } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { borderRadius: 5, borderColor: "lightgrey", borderWidth: 1, width: 30, height: 30, alignItems: "center", justifyContent: "center" },
        addStyle,
      ]}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonText;
