import React, { Component, useState, useEffect } from "react";
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
} from "react-native";
import Header from "../../Components/Header";
import * as FileSystem from "expo-file-system";
import TkphCard from "../../Components/TkphCard";
import * as SQLite from "expo-sqlite";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default ({ navigation, data_sample }) => {
  const [data, setData] = useState("Change this text");
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [reloadSwitch, setReloadSwitch] = useState(false);
  const [dataArray, setDataArray] = useState([
    {
      date_stamp: Date.now(),
      date: "07.01.2020",
      mine_details: "RK Transport",
      tyre_size: "18.00-25",
      max_amb_temp: "35",
      cycle_length: "10",
      cycle_duration: "120",
      vehicle_make: "CAT",
      vehicle_model: "170",
      empty_vehicle_weight: "153760",
      pay_load: "249480",
      weight_correction: "0",
      load_dist_front_unloaded: "47",
      load_dist_rear_unloaded: "53",
      load_dist_front_loaded: "33.3",
      load_dist_rear_loaded: "66.7",
      added_by: "saurabh",
      distance_km_per_hour: "5",
      gross_vehicle_weight: "403240",
      k1_dist_coefficient: "1.12",
      k2_temp_coefficient: "0.85",
      avg_tyre_load_front: "51637",
      avg_tyre_load_rear: "43807",
      basic_site_tkph_front: "258",
      basic_site_tkph_rear: "219",
      real_site_tkph_front: "246",
      real_site_tkph_rear: "209",
    },
  ]);
  const [values, setValues] = useState({
    date_stamp: Date.now(),
    date: "07.01.2020",
    mine_details: "RK Transport",
    tyre_size: "18.00-25",
    max_amb_temp: "35",
    cycle_length: "10",
    cycle_duration: "120",
    vehicle_make: "CAT",
    vehicle_model: "170",
    empty_vehicle_weight: "153760",
    pay_load: "249480",
    weight_correction: "0",
    load_dist_front_unloaded: "47",
    load_dist_rear_unloaded: "53",
    load_dist_front_loaded: "33.3",
    load_dist_rear_loaded: "66.7",
    added_by: "saurabh",
    distance_km_per_hour: "5",
    gross_vehicle_weight: "403240",
    k1_dist_coefficient: "1.12",
    k2_temp_coefficient: "0.85",
    avg_tyre_load_front: "51637",
    avg_tyre_load_rear: "43807",
    basic_site_tkph_front: "258",
    basic_site_tkph_rear: "219",
    real_site_tkph_front: "246",
    real_site_tkph_rear: "209",
  });

  let fileUri = "/xyz123.db";
  const db = SQLite.openDatabase(fileUri);
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from items", [], (_, { rows }) => {
          setDataArray(rows["_array"]);
          setData(JSON.stringify(rows["_array"]));
        });
      },
      null,
      null
    );
  }, [reloadSwitch]);

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
    alert("Record Deleted!");

    setReloadSwitch(!reloadSwitch);
  };
  const [text, setText] = React.useState(null);

  const addSqlDb = () => {
    db.transaction(
      (tx) => {
        values["date_stamp"] = Date.now();
        Object.values(values);
        console.log(JSON.stringify(Object.keys(values)));
        const len = JSON.stringify(Object.keys(values)).length;
        const sqlFields = JSON.stringify(Object.keys(values)).slice(1, len - 1);
        const sqlValues = Object.values(values);

        tx.executeSql(
          `insert into items (${sqlFields}) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          sqlValues
        );
        tx.executeSql("select * from items", [], (_, { rows }) => {
          console.log(rows["_array"]);
        });
      },
      null,
      null
    );
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
      <FlatList
        data={dataArray}
        renderItem={({ item }) => (
          <TkphCard
            navigation={navigation}
            data_sample={item}
            deleteRecord={deleteRecord}
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
