import React, { Component, useState, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  FlatList,
} from "react-native";
import Dialog from "react-native-dialog";
import { Picker } from "@react-native-picker/picker";
import * as SQLite from "expo-sqlite";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default () => {
  let fileUri = "/xyz123.db";
  const db = SQLite.openDatabase(fileUri);

  let dbstore_states = [
    {
      customer_id: "xyz1",
      customer: "xy",
      project: "z1",
      state: "Uttar Pradesh",
      district: "Bareilly",
      siteAddress: "this address",
      otherDetails: "other details",
    },
    {
      customer_id: "xyz2",
      customer: "xy",
      project: "z2",
      state: "Uttar Pradesh",
      district: "Bareilly",
      siteAddress: "this address",
      otherDetails: "other details",
    },
  ];

  //

  function resetDB() {
    let fileUri = "/xyz123.db";
    const db = SQLite.openDatabase(fileUri);
    console.log("working outside");
    db.transaction(
      (tx) => {
        tx.executeSql("drop table if exists customers;");
        tx.executeSql(
          "create table if not exists customers (customer_id TEXT primary key, customer TEXT, project TEXT, state TEXT, district TEXT, siteAddress TEXT, otherDetails TEXT);"
        );
        console.log("working inside");

        dbstore_states.map((item, index) => {
          const len = JSON.stringify(Object.keys(item)).length;
          const sqlFields = JSON.stringify(Object.keys(item)).slice(1, len - 1);
          const sqlValues = Object.values(item);
          console.log(sqlFields);
          console.log(sqlValues);
          tx.executeSql(
            `insert or replace into customers (${sqlFields}) values (?,?,?,?,?,?,?)`,
            sqlValues,
            (success, { rows }) => {
              console.log(rows);
            }
          );
        });
      },
      null,
      null
    );
  }

  function fetchDB() {
    console.log("working outside");
    let fileUri = "/xyz123.db";
    const db = SQLite.openDatabase(fileUri);

    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists customers (customer_id TEXT primary key, customer TEXT, project TEXT, state TEXT, district TEXT, siteAddress TEXT, otherDetails TEXT);"
        );
        tx.executeSql("select * from customers ", [], (_, { rows }) => {
          console.log("connected to DB");
          console.log(rows["_array"]);
          if (rows["_array"].length === 0) {
            console.log("no user");
          } else {
            console.log(rows["_array"]);
          }
        });
      },
      null,
      null
    );
  }

  return (
    <View>
      <Ionicons
        name="reload"
        color={"black"}
        size={25}
        onPress={() => resetDB()}
      />

      <Button title="Add States" onPress={() => resetDB()} />
      <Button title="Fetch States" onPress={() => fetchDB()} />
    </View>
  );
};
