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
import ResetDatabase from './ResetDatabase';

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default ({ navigation, addTyreSize, fields }) => {
  const [selectedTyreSize, setSelectedTyreSize] = useState('Select size');
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [dataArray, setDataArray] = useState([]);

  const [k1_coefficient, setK1_coefficient] = useState();

  let fileUri = '/xyz123.db';
  const db = SQLite.openDatabase(fileUri);
  useEffect(() => {
    console.log(fields);

    if (fields === false) {
      setSelectedTyreSize('Select size');
    }
    db.transaction(
      (tx) => {
        tx.executeSql('select * from tyresizes', [], (_, { rows }) => {
          setDataArray(rows['_array']);
          console.log('this is that');
          console.log(rows['_array']);
        });
      },
      null,
      null
    );
  }, [fields]);

  return (
    <View>
      <View>
        <View>
          {/* Vehicle Make*/}
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Tyre Size</Text>
            <Picker
              selectedValue={selectedTyreSize}
              onValueChange={(textValue, textIndex) => {
                setSelectedTyreSize(textValue);
                addTyreSize(textValue);
              }}
              mode="dialog"
              style={styles.textInput}
              textStyle={styles.pickerText}>
              <Picker.Item label="Select size" value="Select size" />
              {dataArray.map((person, index) => (
                <Picker.Item
                  label={person.tyre_size}
                  value={person.tyre_size}
                />
              ))}
            </Picker>
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
