import React, { useRef, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetView, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

const BottomSheetComponent = () => {
  const bottomSheetModalRef = useRef(null);

  const openModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeModal = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const CustomBackdrop = ({ animatedIndex, style }) => {
    const animatedOpacity = useAnimatedStyle(() => ({
      opacity: interpolate(animatedIndex.value, [0, 1], [0.5, 1], Extrapolate.CLAMP),
    }));

    const containerStyle = useMemo(
      () => [
        animatedOpacity,
        style,
        {
          backgroundColor: "rgba(0, 0, 0, 1)",
        },
      ],
      [style, animatedOpacity]
    );

    return (
      <Animated.View style={containerStyle}>
        <TouchableOpacity style={{ flex: 1 }} onPress={closeModal}></TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      // index={0}
      // snapPoints={[100, "100%"]}
      animateOnMount={true}
      enablePanDownToClose={true}
      enableDynamicSizing
      backdropComponent={CustomBackdrop}>
      <BottomSheetScrollView style={styles.content}>
        <Text style={{ borderWidth: 1 }}>asdsadsa</Text>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    padding: 16,
    // alignItems: "center",
    // height: 500,
  },
});

export default BottomSheetComponent;
