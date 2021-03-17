import React, { Component, useState } from "react";
import { Button, Image, StyleSheet, Text, View, StatusBar } from "react-native";
import Header from "./Header";
import {
  Card,
  DataTable,
  Subheading,
  Dialog,
  Paragraph,
} from "react-native-paper";

export default ({ route, navigation }) => {
  const [visible, setVisible] = useState();
  const { data123 } = route.params;

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <Card elevation={10} style={styles.card} onPress={showDialog}>
      <View style={styles.heading}>
        <Subheading>Subheading</Subheading>
      </View>
      <DataTable.Row>
        <DataTable.Cell>date-stamp</DataTable.Cell>
        <DataTable.Cell>{data123["date_stamp"]}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>vehicle_make</DataTable.Cell>
        <DataTable.Cell>{data123["vehicle_make"]}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>vehicle_model</DataTable.Cell>
        <DataTable.Cell>{data123["vehicle_model"]}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>tyre_size</DataTable.Cell>
        <DataTable.Cell>{data123["tyre_size"]}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>added_by</DataTable.Cell>
        <DataTable.Cell>{data123["added_by"]}</DataTable.Cell>
      </DataTable.Row>
            <DataTable.Row>
        <DataTable.Cell>gross_vehicle_weight</DataTable.Cell>
        <DataTable.Cell>{data123["gross_vehicle_weight"]}</DataTable.Cell>
      </DataTable.Row>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
  },
  logo: {
    height: 80,
  },
  card: {
    marginBottom: 10,
  },
  heading: {
    marginBottom: 10,
    alignItems: "center",
  },
});
