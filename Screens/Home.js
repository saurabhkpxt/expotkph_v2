import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View, StatusBar } from "react-native";
import Header from "./Header";
import ResetDatabase from "../Components/ResetDatabase";

export default ({ navigation }) => (
  <View>
    <Text>This is home screen!!!</Text>
    <Header />
    <Button
      title="Add new calculation"
      onPress={() => navigation.navigate("NewCalc")}
    />
    <Button
      title="Available calculations"
      onPress={() => navigation.navigate("AvailableCalc")}
    />
    <Button title="Database" onPress={() => navigation.navigate("Database")} />
    <ResetDatabase />
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
  },
  logo: {
    height: 80,
  },
});
