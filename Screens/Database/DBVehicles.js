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
import Header from '../../Header';
import * as SQLite from 'expo-sqlite';
import Constants from 'expo-constants';
import ResetDatabase from '../../Components/ResetDatabase';

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default ({ navigation }) => {
  const [vehicleMakePV, setVehicleMakePV] = useState('Select make');
  const [vehicleModelPV, setVehicleModelPV] = useState('Select model');
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [dataArray, setDataArray] = useState();
  const [vehicleMakeList, setVehicleMakeList] = useState([]);
  const [vehicleModelList, setVehicleModelList] = useState([]);
  const [vehicle_make, setVehicle_make] = useState();
  const [vehicle_model, setVehicle_model] = useState();
  const [empty_vehicle_weight, setEmpty_vehicle_weight] = useState();
  const [pay_load, setPay_load] = useState();
  const [load_dist_front_unloaded, setLoad_dist_front_unloaded] = useState();
  const [load_dist_rear_unloaded, setLoad_dist_rear_unloaded] = useState();
  const [load_dist_front_loaded, setLoad_dist_front_loaded] = useState();
  const [load_dist_rear_loaded, setLoad_dist_rear_loaded] = useState();
  const [makeVisible, setMakeVisible] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);

  let fileUri = '/xyz123.db';
  const db = SQLite.openDatabase(fileUri);
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql('select * from vehicles1', [], (_, { rows }) => {
          setDataArray(rows['_array']);
          setVehicleMakeList(removeDuplicates(rows['_array']));
          console.log(removeDuplicates(rows['_array']));
        });
      },
      null,
      null
    );
  }, []);

  // to add a new vehicle details

  function addK1Coefficient({ input_value }) {
    console.log(fileUri);
    let x = vehicle_make + vehicle_model;

    db.transaction(
      (tx) => {
        const values = {
          vehicle_id: x,
          vehicle_make: input_value['vehicle_make'],
          vehicle_model: input_value['vehicle_model'],
          empty_vehicle_weight: input_value['empty_vehicle_weight'],
          pay_load: input_value['pay_load'],
          load_dist_front_unloaded: input_value['load_dist_front_unloaded'],
          load_dist_rear_unloaded: input_value['load_dist_rear_unloaded'],
          load_dist_front_loaded: input_value['load_dist_front_loaded'],
          load_dist_rear_loaded: input_value['load_dist_rear_loaded'],
        };
        const len = JSON.stringify(Object.keys(values)).length;
        const sqlFields = JSON.stringify(Object.keys(values)).slice(1, len - 1);
        const sqlValues = Object.values(values);
        console.log(
          `insert or replace into vehicles1 (${sqlFields}) values (?,?,?,?,?,?,?,?,?)`
        );
        console.log(sqlValues);

        tx.executeSql(
          `insert or replace into vehicles1 (${sqlFields}) values (?,?,?,?,?,?,?,?,?)`,
          sqlValues
        );
        tx.executeSql('select * from vehicles1', [], (_, { rows }) => {
          setDataArray(rows['_array']);
          console.log(rows['_array']);
        });
      },
      null,
      null
    );

    setVehicleMakePV('Select make');
    setVehicleModelPV('Select model');
    setEmpty_vehicle_weight('');
    setPay_load('');
    setLoad_dist_front_unloaded('');
    setLoad_dist_rear_unloaded('');
    setLoad_dist_front_loaded('');
    setLoad_dist_rear_loaded('');
  }

  function fillVehicleModel(textValue) {
    console.log('fillVehicleModel');
    console.log(textValue);
    setEmpty_vehicle_weight('');
    setPay_load('');
    setLoad_dist_front_unloaded('');
    setLoad_dist_rear_unloaded('');
    setLoad_dist_front_loaded('');
    setLoad_dist_rear_loaded('');

    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from vehicles1 where vehicle_make = '${textValue}';`,
          [],
          (_, { rows }) => {
            setVehicleModelList(rows['_array']);
            console.log(123);
            console.log(rows['_array']);
          }
        );
      },
      null,
      null
    );
  }

  let remaining_inputs = ['empty_vehicle_weight', 'pay_load'];

  let input_value = {
    vehicle_make: vehicle_make,
    vehicle_model: vehicle_model,
    empty_vehicle_weight: empty_vehicle_weight,
    pay_load: pay_load,
    load_dist_front_unloaded: load_dist_front_unloaded,
    load_dist_rear_unloaded: load_dist_rear_unloaded,
    load_dist_front_loaded: load_dist_front_loaded,
    load_dist_rear_loaded: load_dist_rear_loaded,
  };
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleAddMake = () => {
    vehicleMakeList.push({
      vehicle_make: vehicle_make,
      vehicle_model: vehicleModelPV,
    });
    setMakeVisible(false);
  };
  const handleAddModel = () => {
    console.log(vehicleModelPV);
    console.log(vehicle_make);
    vehicleModelList.push({
      vehicle_make: vehicle_make,
      vehicle_model: vehicleModelPV,
    });
    console.log(vehicleModelList);
    setModelVisible(false);
  };
  const fillVehicleData = (textValue) => {
    setEmpty_vehicle_weight('');
    setPay_load('');
    setLoad_dist_front_unloaded('');
    setLoad_dist_rear_unloaded('');
    setLoad_dist_front_loaded('');
    setLoad_dist_rear_loaded('');
    console.log(
      `select * from vehicles1 where vehicle_make = '${vehicleMakePV}' and vehicle_model = '${textValue}' ;`
    );
    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from vehicles1 where vehicle_make = '${vehicleMakePV}' and vehicle_model = '${textValue}' ;`,
          [],
          (_, { rows }) => {
            //setVehicleModelList(rows['_array']);
            console.log(123);
            console.log(rows['_array']);
            setEmpty_vehicle_weight(rows['_array'][0]['empty_vehicle_weight']);
            setPay_load(rows['_array'][0]['pay_load']);
            setLoad_dist_front_unloaded(
              rows['_array'][0]['load_dist_front_unloaded']
            );
            setLoad_dist_rear_unloaded(
              rows['_array'][0]['load_dist_rear_unloaded']
            );
            setLoad_dist_front_loaded(
              rows['_array'][0]['load_dist_front_loaded']
            );
            setLoad_dist_rear_loaded(
              rows['_array'][0]['load_dist_rear_loaded']
            );
            console.log(rows['_array'][0]['load_dist_front_loaded']);
          }
        );
      },
      null,
      null
    );
  };

  const handleCancel = () => {
    setMakeVisible(false);
    setModelVisible(false);
  };

  const clearOtherFields = () => {
    setEmpty_vehicle_weight('');
    setPay_load('');
    setLoad_dist_front_unloaded('');
    setLoad_dist_rear_unloaded('');
    setLoad_dist_front_loaded('');
    setLoad_dist_rear_loaded('');
  };

  return (
    <View style={{marginTop:Constants.StatusBarHeight}}>
      <View>
      <View style={{flexDirection:"row",justifyContent:'center', alignItems:"center"}}>
        <Text style={{fontSize:20, fontWeight:'bold', alignSelf:'center', margin:10, color:'darkred'}}>Add Vehicle Details</Text>
        
        <ResetDatabase/>
        </View>
        <View style={styles.outerBox}>
          {/* Vehicle Make*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Vehicle Make</Text>
            <Picker
              selectedValue={vehicleMakePV}
              onValueChange={(textValue, textIndex) => {
                if (textValue === 'Add new make') {
                  setMakeVisible(true);
                } else {
                  fillVehicleModel(textValue);
                  setVehicleMakePV(textValue);
                  setVehicle_make(textValue);
                }
              }}
              mode="dialog"
              style={styles.textInput}
              textStyle={styles.pickerText}>
              <Picker.Item label="Select make" value="Select make" />
              {vehicleMakeList.map((person, index) => (
                <Picker.Item
                  label={person.vehicle_make}
                  value={person.vehicle_make}
                />
              ))}
              <Picker.Item label="Add new make" value="Add new make" />
            </Picker>
          </View>
          <Dialog.Container
            visible={makeVisible}
            onBackdropPress={handleCancel}>
            <Dialog.Title>Enter Vehicle Make</Dialog.Title>
            <Dialog.Input
              onChangeText={(text) => {
                setVehicleMakePV(text);
                setVehicle_make(text);
              }}
            />
            <Dialog.Button label="Add" onPress={handleAddMake} />
          </Dialog.Container>
          {/* Vehicle Model*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Vehicle Model</Text>
            <Picker
              selectedValue={vehicleModelPV}
              onValueChange={(textValue, textIndex) => {
                if (textValue === 'Add new model') {
                  setModelVisible(true);
                } else {
                  setVehicleModelPV(textValue);
                  setVehicle_model(textValue);
                  fillVehicleData(textValue);
                }
              }}
              mode="dialog"
              style={styles.textInput}
              textStyle={styles.pickerText}>
              <Picker.Item label="Select model" value="Select model" />
              {vehicleModelList.map((person, index) => (
                <Picker.Item
                  label={person.vehicle_model}
                  value={person.vehicle_model}
                />
              ))}
              <Picker.Item label="Add new model" value="Add new model" />
            </Picker>
          </View>
          <Dialog.Container
            visible={modelVisible}
            onBackdropPress={handleCancel}>
            <Dialog.Title>Enter Vehicle Model</Dialog.Title>
            <Dialog.Input
              onChangeText={(text) => {
                setVehicleModelPV(text);
                setVehicle_model(text);
              }}
            />
            <Dialog.Button label="Add" onPress={handleAddModel} />
          </Dialog.Container>
          {/* Empty Vehicle Weight*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Empty Vehicle Weight (EVW)</Text>
            <TextInput
              style={styles.textInput}
              value={empty_vehicle_weight}
              onChangeText={(text) => setEmpty_vehicle_weight(text)}
              placeholder="Enter EVW"
            />
          </View>
          {/* Pay Load*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Pay Load</Text>
            <TextInput
              style={styles.textInput}
              value={pay_load}
              onChangeText={(text) => setPay_load(text)}
              placeholder="Pay Load"
            />
          </View>
          {/* Load Dist. Front Unloaded*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Load Dist. (Front Unloaded)</Text>
            <TextInput
              style={styles.textInput}
              value={load_dist_front_unloaded}
              onChangeText={(text) => setLoad_dist_front_unloaded(text)}
              placeholder="Enter %"
            />
          </View>
          {/* Load Dist. Rear Unloaded*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Load Dist. (Rear Unloaded)</Text>
            <TextInput
              style={styles.textInput}
              value={load_dist_rear_unloaded}
              onChangeText={(text) => setLoad_dist_rear_unloaded(text)}
              placeholder="Enter %"
            />
          </View>
          {/* Load Dist. Front Loaded*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Load Dist. (Front Loaded)</Text>
            <TextInput
              style={styles.textInput}
              value={load_dist_front_loaded}
              onChangeText={(text) => setLoad_dist_front_loaded(text)}
              placeholder="Enter %"
            />
          </View>
          {/* Load Dist. Rear Loaded*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Load Dist. (Rear Loaded)</Text>
            <TextInput
              style={styles.textInput}
              value={load_dist_rear_loaded}
              onChangeText={(text) => setLoad_dist_rear_loaded(text)}
              placeholder="Enter %"
            />
          </View>
        </View>
        <Button
          title="Save Vehicle Details"
          color='darkblue'
          onPress={() => {
            if (
              vehicleMakePV === 'Select make' ||
              vehicleModelPV === 'Select model'
            ) {
              alert('Please enter vehicle name');
              console.log('Please fill required fields');
            } else {
              console.log(123);
              console.log(JSON.stringify(input_value));

              addK1Coefficient({ input_value });
            }
          }}
        />
      </View>
    </View>
  );
};

//styles
const styles = StyleSheet.create({

  logo: {
    height: 80,
  },
  level: {
    height: 40,
    width: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  level1: {
    height: 40,
    width: '25%',
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  ltCombo: {
    flexDirection: 'row',
  },
  textInput: {
    margin: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '50%',
  },
  flatList: {
    height: '50%',
  },
});

//function to remove duplicates from the object of an array.
function removeDuplicates(books) {
  console.log(books);
  let newArray = [];
  let uniqueObject = {};
  for (let i in books) {
    let objTitle = books[i]['vehicle_make'];
    uniqueObject[objTitle] = books[i];
  }
  for (i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }
  console.log(newArray);
  return newArray;
}
