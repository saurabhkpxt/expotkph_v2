import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default () => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text>JK Tyre</Text>
        <View style={{ alignSelf: "flex-end" }}>
          <AntDesign name="stepforward" size={24} color="black" />
          <Text>JK Tyre</Text>
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          <AntDesign name="stepforward" size={24} color="black" />
          <Text>JK Tyre</Text>
        </View>
      </View>
    </View>
  );
};
