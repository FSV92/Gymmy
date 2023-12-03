import React from "react";
import { TouchableOpacity, Text } from "react-native";

import TrashIcon from "../../assets/icons/TrashIcon";

const ButtonDel = (props) => {
  const { onPress, addStyle } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[{ borderRadius: 5, borderColor: "lightgrey", borderWidth: 1, padding: 7 }, addStyle]}>
      {/* <Text>Del</Text> */}
      <TrashIcon width={20} height={20} color="grey" />
    </TouchableOpacity>
  );
};

export default ButtonDel;
