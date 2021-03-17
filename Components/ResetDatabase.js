import React, { Component, useState, useEffect } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  FlatList,
} from 'react-native';
import Dialog from 'react-native-dialog';
import { Picker } from '@react-native-picker/picker';
import * as SQLite from 'expo-sqlite';

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default () => {
  let fileUri = '/xyz123.db';
  const db = SQLite.openDatabase(fileUri);

  let dbstore_vehicles = require('../vehicles.json');
  //console.log(dbstore_vehicles);

  let dbstore_tyresizes = require('../tyresizes.json');
  //console.log(dbstore_vehicles);

  let dbstore_k1coefficient = require('../k1coefficient.json');
  //console.log(dbstore_k1coefficient);
  function resetDB() {
    console.log('working outside');
    console.log(123);

    db.transaction(
      (tx) => {
        tx.executeSql('drop table if exists k1coefficient');
        tx.executeSql('drop table if exists tyresizes');
        tx.executeSql('drop table if exists vehicles');

        tx.executeSql(
          'create table if not exists k1coefficient (cycle_length TEXT primary key not null, k1_coefficient TEXT);'
        );
        tx.executeSql(
          'create table if not exists tyresizes (tyre_size TEXT primary key not null);'
        );
        tx.executeSql(
          'create table if not exists vehicles1 (vehicle_id TEXT primary key not null, vehicle_make TEXT,vehicle_model TEXT,empty_vehicle_weight TEXT,pay_load TEXT,load_dist_front_unloaded TEXT,load_dist_rear_unloaded TEXT,load_dist_front_loaded TEXT,load_dist_rear_loaded TEXT);'
        );
        console.log('working inside');

        dbstore_k1coefficient.map((item, index) => {
          const len = JSON.stringify(Object.keys(item)).length;
          const sqlFields = JSON.stringify(Object.keys(item)).slice(1, len - 1);
          const sqlValues = Object.values(item);
          tx.executeSql(
            `insert into k1coefficient (${sqlFields}) values (?,?)`,
            sqlValues
          );
        });

        dbstore_tyresizes.map((item, index) => {
          const len = JSON.stringify(Object.keys(item)).length;
          const sqlFields = JSON.stringify(Object.keys(item)).slice(1, len - 1);
          const sqlValues = Object.values(item);
          tx.executeSql(
            `insert into tyresizes (${sqlFields}) values (?)`,
            sqlValues
          );
        });

        dbstore_vehicles.map((item, index) => {
          const len = JSON.stringify(Object.keys(item)).length;
          const sqlFields = JSON.stringify(Object.keys(item)).slice(1, len - 1);
          const sqlValues = Object.values(item);
          tx.executeSql(
            `insert or replace into vehicles1 (${sqlFields}) values (?,?,?,?,?,?,?,?,?)`,
            sqlValues
          );
        });
      },
      null,
      null
    );
  }

  return (
    <View>
      <Button title="Reset Database" onPress={() => resetDB()} />
    </View>
  );
};
