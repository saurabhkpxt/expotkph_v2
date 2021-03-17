import React, { Component, useState, useEffect } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import Header from './Header';
import * as FileSystem from 'expo-file-system';
import TkphCardCloud from './TkphCardCloud';
import * as SQLite from 'expo-sqlite';
import axios from './axios';

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default ({ navigation, data_sample }) => {
  const [data, setData] = useState('Change this text');
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [reloadSwitch, setReloadSwitch] = useState(false);
  const [dataArray, setDataArray] = useState([
    {
      date_stamp: Date.now(),
      date: '07.01.2020',
      mine_details: 'RK Transport',
      tyre_size: '18.00-25',
      max_amb_temp: '35',
      cycle_length: '10',
      cycle_duration: '120',
      vehicle_make: 'CAT',
      vehicle_model: '170',
      empty_vehicle_weight: '153760',
      pay_load: '249480',
      weight_correction: '0',
      load_dist_front_unloaded: '47',
      load_dist_rear_unloaded: '53',
      load_dist_front_loaded: '33.3',
      load_dist_rear_loaded: '66.7',
      added_by: 'saurabh',
      distance_km_per_hour: '5',
      gross_vehicle_weight: '403240',
      k1_dist_coefficient: '1.12',
      k2_temp_coefficient: '0.85',
      avg_tyre_load_front: '51637',
      avg_tyre_load_rear: '43807',
      basic_site_tkph_front: '258',
      basic_site_tkph_rear: '219',
      real_site_tkph_front: '246',
      real_site_tkph_rear: '209',
    },
  ]);
  const [values, setValues] = useState({
    date_stamp: Date.now(),
    date: '07.01.2020',
    mine_details: 'RK Transport',
    tyre_size: '18.00-25',
    max_amb_temp: '35',
    cycle_length: '10',
    cycle_duration: '120',
    vehicle_make: 'CAT',
    vehicle_model: '170',
    empty_vehicle_weight: '153760',
    pay_load: '249480',
    weight_correction: '0',
    load_dist_front_unloaded: '47',
    load_dist_rear_unloaded: '53',
    load_dist_front_loaded: '33.3',
    load_dist_rear_loaded: '66.7',
    added_by: 'saurabh',
    distance_km_per_hour: '5',
    gross_vehicle_weight: '403240',
    k1_dist_coefficient: '1.12',
    k2_temp_coefficient: '0.85',
    avg_tyre_load_front: '51637',
    avg_tyre_load_rear: '43807',
    basic_site_tkph_front: '258',
    basic_site_tkph_rear: '219',
    real_site_tkph_front: '246',
    real_site_tkph_rear: '209',
    uploaded:'true'
  });

  const column_names = [
    'date_stamp',
    'date',
    'mine_details',
    'tyre_size',
    'max_amb_temp',
    'cycle_length',
    'cycle_duration',
    'vehicle_make',
    'vehicle_model',
    'empty_vehicle_weight',
    'pay_load',
    'weight_correction',
    'load_dist_front_unloaded',
    'load_dist_rear_unloaded',
    'load_dist_front_loaded',
    'load_dist_rear_loaded',
    'added_by',
    'distance_km_per_hour',
    'gross_vehicle_weight',
    'k1_dist_coefficient',
    'k2_temp_coefficient',
    'avg_tyre_load_front',
    'avg_tyre_load_rear',
    'basic_site_tkph_front',
    'basic_site_tkph_rear',
    'real_site_tkph_front',
    'real_site_tkph_rear',
    'uploaded',
  ];

  let fileUri = '/xyz123.db';
  const db = SQLite.openDatabase(fileUri);
  useEffect(() => {
    async function getData() {
      console.log(123);
      const req = await axios.get('/allrecords');
      console.log(12345);
      console.log(req.data);
      let report_data = [];

      let data = {};

      for (let key2 in req.data['date_stamp']) {
        for (let cl_name in column_names) {
          data[column_names[cl_name]] = req.data[column_names[cl_name]][key2];
        }
        report_data.push(data);
      }
      console.log(report_data);

      const dbStoreCloud = require('./cloudData.json');
      setDataArray(report_data);
    }
    getData();
  }, [reloadSwitch]);

  const insert = () => {
    async function insertData() {
      console.log(123);
      values['date_stamp']=Date.now()
      const req = await axios.post('/insertrecords/', values);
      console.log(12345);
      console.log(req.data);
      let report_data = [];

      let data = {};

      for (let key2 in req.data['date_stamp']) {
        for (let cl_name in column_names) {
          data[column_names[cl_name]] = req.data[column_names[cl_name]][key2];
        }
        report_data.push(data);
      }
      console.log(report_data);
      setReloadSwitch(!reloadSwitch);
      alert('record inserted')
    }
    insertData();
  };

  const deleteRecord = (date_stamp) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `delete from items where date_stamp ='${date_stamp}'`,
          []
        );
      },
      null,
      null
    );
    alert('Record Deleted!');

    setReloadSwitch(!reloadSwitch);
  };
  const [text, setText] = React.useState(null);

  const importToLocal = (values) => {
    db.transaction(
      (tx) => {
        values['date_stamp'] = Date.now();
        Object.values(values);
        console.log(JSON.stringify(Object.keys(values)));
        const len = JSON.stringify(Object.keys(values)).length;
        const sqlFields = JSON.stringify(Object.keys(values)).slice(1, len - 1);
        const sqlValues = Object.values(values);

        tx.executeSql(
          `insert into items (${sqlFields}) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          sqlValues
        );
        tx.executeSql('select * from items', [], (_, { rows }) => {
          console.log(rows['_array']);
        });
      },
      null,
      null
    );
    alert('Record Imported to Local Storage!');
  };

  return (
    <View style={styles.header}>
      <Button
        color="black"
        onPress={() => {
          setReloadSwitch(!reloadSwitch);
        }}
        title="Reload"
      />
      <Button
        color="black"
        onPress={() => {
          insert();
        }}
        title="Insert Record"
      />

      <FlatList
        data={dataArray}
        renderItem={({ item }) => (
          <TkphCardCloud
            navigation={navigation}
            data_sample={item}
            importToLocal={importToLocal}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
  },
  logo: {
    height: 80,
  },
});
