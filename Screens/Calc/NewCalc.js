import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import VehicleForCalc from './Components/VehicleForCalc';
import CycleForCalc from './Components/CycleForCalc';
import SizeForCalc from './Components/SizeForCalc';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

import { useNavigation } from '@react-navigation/native';

function NewCalc() {
  const [mine_details, setMine_details] = useState('');
  const [tyre_size, setTyre_size] = useState('');
  const [max_amb_temp, setMax_amb_temp] = useState('');
  const [cycle_length, setCycle_length] = useState('');
  const [k1_coefficient, setK1_coefficient] = useState();
  const [cycle_duration, setCycle_duration] = useState('');
  const [vehicle_make, setVehicle_make] = useState('');
  const [vehicle_model, setVehicle_model] = useState('');
  const [empty_vehicle_weight, setEmpty_vehicle_weight] = useState('');
  const [pay_load, setPay_load] = useState('');
  const [weight_correction, setWeight_correction] = useState('');
  const [load_dist_front_unloaded, setLoad_dist_front_unloaded] = useState('');
  const [load_dist_rear_unloaded, setLoad_dist_rear_unloaded] = useState('');
  const [load_dist_front_loaded, setLoad_dist_front_loaded] = useState('');
  const [load_dist_rear_loaded, setLoad_dist_rear_loaded] = useState('');
  const [fields, setFields] = useState(true);

  const navigation = useNavigation();

  let fileUri = '/xyz123.db';
  const db = SQLite.openDatabase(fileUri);

  function addTyreSize(data) {
    setTyre_size(data);
  }
  function addCycleLength(data) {
    console.log(data);
    setCycle_length(parseFloat(data[0]['cycle_length']));
    setK1_coefficient(parseFloat(data[0]['k1_coefficient']));
  }
  function addVehicleDetails(data) {
    console.log(data);
    setVehicle_make(data[0]['vehicle_make']);
    setVehicle_model(data[0]['vehicle_model']);
    setEmpty_vehicle_weight(parseFloat(data[0]['empty_vehicle_weight']));
    setPay_load(parseFloat(data[0]['pay_load']));
    setLoad_dist_front_unloaded(
      parseFloat(data[0]['load_dist_front_unloaded'])
    );
    setLoad_dist_rear_unloaded(parseFloat(data[0]['load_dist_rear_unloaded']));
    setLoad_dist_front_loaded(parseFloat(data[0]['load_dist_front_loaded']));
    setLoad_dist_rear_loaded(parseFloat(data[0]['load_dist_rear_loaded']));
  }

  const addSqlDb = () => {
    const date_format = new Date();

    const distance_km_per_hour = (cycle_length / cycle_duration) * 60;

    const k2_temp_coefficient =
      (distance_km_per_hour + 0.25 * (max_amb_temp - 38)) /
      distance_km_per_hour;

    const gross_vehicle_weight = parseFloat(
      empty_vehicle_weight + pay_load + weight_correction
    );

    const avg_tyre_load_front =
      ((empty_vehicle_weight * load_dist_front_unloaded * 0.01) / 2 +
        (gross_vehicle_weight * load_dist_front_loaded * 0.01) / 2) /
      2;

    const avg_tyre_load_rear =
      ((empty_vehicle_weight * load_dist_rear_unloaded * 0.01) / 4 +
        (gross_vehicle_weight * load_dist_rear_loaded * 0.01) / 4) /
      2;

    const date = new Date().toISOString();

    let values = {
      date_stamp: Date.now(),
      date: date,
      mine_details: mine_details,
      tyre_size: tyre_size,
      max_amb_temp: max_amb_temp,
      cycle_length: cycle_length,
      cycle_duration: cycle_duration,
      vehicle_make: vehicle_make,
      vehicle_model: vehicle_model,
      empty_vehicle_weight: empty_vehicle_weight,
      pay_load: pay_load,
      weight_correction: weight_correction,
      load_dist_front_unloaded: load_dist_front_unloaded,
      load_dist_rear_unloaded: load_dist_rear_unloaded,
      load_dist_front_loaded: load_dist_front_loaded,
      load_dist_rear_loaded: load_dist_rear_loaded,
      added_by: 'saurabh',
      distance_km_per_hour: distance_km_per_hour,
      gross_vehicle_weight: gross_vehicle_weight,
      k1_dist_coefficient: k1_coefficient,
      k2_temp_coefficient: k2_temp_coefficient,
      avg_tyre_load_front: avg_tyre_load_front,
      avg_tyre_load_rear: avg_tyre_load_rear,
      basic_site_tkph_front: parseInt(
        (avg_tyre_load_front * distance_km_per_hour) / 1000
      ),
      basic_site_tkph_rear: parseInt(
        (avg_tyre_load_rear * distance_km_per_hour) / 1000
      ),
      real_site_tkph_front: parseInt(
        ((avg_tyre_load_front * distance_km_per_hour) / 1000) *
          k1_coefficient *
          k2_temp_coefficient
      ),
      real_site_tkph_rear: parseInt(
        ((avg_tyre_load_rear * distance_km_per_hour) / 1000) *
          k1_coefficient *
          k2_temp_coefficient
      ),
      uploaded: false,
    };
    console.log(values);
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
          console.log(JSON.stringify(rows['_array']));
        });
      },
      null,
      null
    );
  };

  return (
    <View style={styles.home}>
      <Text style={styles.text}>TKPH Calculations </Text>
      <ScrollView>
        <View style={styles.outerBox}>
          <Text style={styles.boxHeader}>Mine & Tyre Details </Text>
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Mine Name & Address</Text>
            <TextInput
              style={styles.textInput}
              value={mine_details}
              onChangeText={(text) => setMine_details(text)}
              placeholder="Enter Mine Details"
            />
          </View>
          {/* Size Details */}
          <SizeForCalc addTyreSize={addTyreSize} fields={fields} />

          <View style={styles.ltCombo}>
            <Text style={styles.level}>Max Ambient Temp</Text>
            <TextInput
              style={styles.textInput}
              value={max_amb_temp}
              onChangeText={(text) => setMax_amb_temp(text)}
              placeholder="Enter Max Amb. Temp."
            />
          </View>
        </View>
        <View style={styles.outerBox}>
          <Text style={styles.boxHeader}>Cycle Details </Text>
          {/* Cycle Details */}
          <CycleForCalc addCycleLength={addCycleLength} />
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Cycle Duration</Text>
            <TextInput
              style={styles.textInput}
              value={cycle_duration}
              onChangeText={(text) => setCycle_duration(text)}
              placeholder="Enter Cycle Duration."
            />
          </View>
        </View>

        {/* Vehicle Details*/}
        <View style={styles.outerBox}>
          <Text style={styles.boxHeader}>Vehicle Details </Text>
          <VehicleForCalc
            addVehicleDetails={addVehicleDetails}
            fields={fields}
          />
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Weight Correction</Text>
            <TextInput
              style={styles.textInput}
              value={weight_correction}
              onChangeText={(text) => setWeight_correction(parseFloat(text))}
              placeholder="Enter Weight Correction"
            />
          </View>
        </View>

        <Button
          onPress={() => {
            addSqlDb();
            /*
            setFields(false);
            setTimeout(() => {
              setFields(true);
            }, 500);
            */
          }}
          title="Submit"
        />
      </ScrollView>
    </View>
  );
}

export default NewCalc;

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxHeader: {
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  textInput: {
    margin: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '60%',
  },
  level: {
    height: 40,
    width: '40%',
    textAlign: 'left',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  ltCombo: {
    flexDirection: 'row',
  },
  outerBox: {
    padding: 5,
    paddingTop: 0,
    marginHorizontal: 'auto',
    width: '100%',
    maxWidth: 500,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
