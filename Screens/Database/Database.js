import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View, StatusBar } from "react-native";
import Header from "../../Header";

export default ({ navigation }) => (
  <View style={styles.header}>
    <Text>This is home screen!!!</Text>
    <Header />
    <Button title="Vehicles" onPress={() => navigation.navigate("NewCalc")} />
    <Button
      title="Tyre Sizes"
      onPress={() => navigation.navigate("AvailableCalc")}
    />
    <Button title="K1 Coefficient" onPress={() => console.log(123)} />
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
