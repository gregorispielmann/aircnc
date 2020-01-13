import React from "react";

import { View, Dimensions } from "react-native";

import {
  DotIndicator,
} from 'react-native-indicators';

export default function Loading() {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        display: "block",
        backgroundColor: "#ffffff80",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"
      }}
    >
      <DotIndicator color='#f05a5b'></DotIndicator>
    </View>
  );
}
