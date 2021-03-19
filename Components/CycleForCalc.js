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

export default ({ navigation, addCycleLength, fields }) => {
  const [selectedCycleLength, setSelectedCycleLength] = useState('Select cycle length');
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [dataArray, setDataArray] = useState([]);
  const [k1_coefficient, setK1_coefficient] = useState();

  let fileUri = '/xyz123.db';
  const db = SQLite.openDatabase(fileUri);
  useEffect(() => {
    console.log('cycle is working')
    if (fields === false) {
      setSelectedCycleLength('Select cycle length');
      setK1_coefficient('')
    }
    db.transaction(
      (tx) => {
        tx.executeSql('select * from k1coefficient', [], (_, { rows }) => {
          setDataArray(rows['_array']);
          console.log('this is that')
          console.log(rows['_array'])
        });
      },
      null,
      null
    );
  }, [fields]);

  const fillVehicleData = (textValue) => {
    setK1_coefficient('');
    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from k1coefficient where cycle_length = '${textValue}';`,
          [],
          (_, { rows }) => {
            //setVehicleModelList(rows['_array']);
            console.log(rows['_array']);
            setK1_coefficient(rows['_array'][0]['k1_coefficient']);
            addCycleLength(rows['_array']);
          }
        );
      },
      null,
      null
    );
  };

  return (
    <View>
      <View>
        <View>
          {/* Vehicle Make*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Cycle Length</Text>
            <Picker
              selectedValue={selectedCycleLength}
              onValueChange={(textValue, textIndex) => {
                  fillVehicleData(textValue);
                  setSelectedCycleLength(textValue);
                
              }}
              mode="dialog"
              style={styles.textInput}
              textStyle={styles.pickerText}>
              <Picker.Item label="Select cycle length" value="Select cycle length" />
              {dataArray.map((person, index) => (
                <Picker.Item
                  label={person.cycle_length}
                  value={person.cycle_length}
                />
              ))}
            </Picker>
          </View>
          {/* Empty Vehicle Weight*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>K1 Coefficient</Text>
            <TextInput
              style={styles.textInput}
              value={k1_coefficient}
              onChangeText={(text) => setK1_coefficient(text)}
              placeholder="Enter EVW"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

//styles
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



