import React from "react";

import { View, ActivityIndicator, Text, Dimensions } from "react-native";

export default function Loading() {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);

  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        zIndex: 1000,
        display: "block",
        backgroundColor: "#ffffff90",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"
      }}
    >
      <Text>Erro! Usuário não encontrado!</Text>
    </View>
  );
}
