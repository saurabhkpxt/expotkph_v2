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
import Header from '../../Header';
import * as SQLite from 'expo-sqlite';
import Constants from 'expo-constants';
import ResetDatabase from '../../Components/ResetDatabase';

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default ({ navigation }) => {
  const [ci, setCi] = useState('1');
  const [ki, setKi] = useState('2');
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [addForm, setAddForm] = useState(false);
  const [content, setContent] = useState(<View></View>);
  const [dataArray, setDataArray] = useState([
    {
      cycle_length: 1,
      k1_coefficient: 1,
    },
  ]);
  let fileUri = '/xyz123.db';
  const db = SQLite.openDatabase(fileUri);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql('select * from k1coefficient', [], (_, { rows }) => {
          console.log('connected to DB');
          console.log(rows['_array']);
          setDataArray(rows['_array']);
        });
      },
      null,
      null
    );
  }, []);

  function addK1Coefficient({ input_value }) {
    console.log('adding');

    db.transaction(
      (tx) => {
        const values = {
          cycle_length: input_value['cycle_length'],
          k1_coefficient: input_value['k1_coefficient'],
        };
        const len = JSON.stringify(Object.keys(values)).length;
        const sqlFields = JSON.stringify(Object.keys(values)).slice(1, len - 1);
        const sqlValues = Object.values(values);

        tx.executeSql(
          `insert into k1coefficient (${sqlFields}) values (?,?)`,
          sqlValues
        );
        tx.executeSql('select * from k1coefficient', [], (_, { rows }) => {
          console.log(rows['_array']);
          setDataArray(rows['_array']);
          //setData(JSON.stringify(rows["_array"]));
        });
      },
      null,
      null
    );
    setAddForm(false);
  }

  let input_value = {
    cycle_length: '',
    k1_coefficient: '',
  };

  useEffect(() => {
    let x = (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
              margin: 10,
              color: 'darkred',
            }}>
            Add New K1 Coefficient
          </Text>

          
        </View>
        <View style={styles.ltCombo}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => (input_value['cycle_length'] = text)}
            placeholder="Enter cycle length"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => (input_value['k1_coefficient'] = text)}
            placeholder="Enter k1 coefficient"
          />
        </View>

        <View style={{ flexDirection: 'row', margin: 10 }}>
          <View style={styles.button}>
            <Button
              color="darkblue"
              title="Add"
              onPress={() => addK1Coefficient({ input_value })}
            />
          </View>
          <View style={styles.button}>
            <Button
              color="darkred"
              title="Cancel"
              onPress={() => setAddForm(false)}
            />
          </View>
        </View>
      </View>
    );
    let y = (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
              margin: 10,
              color: 'darkred',
            }}>
            Available K1 Coefficient
          </Text>
          <ResetDatabase />
        </View>
        <View style={styles.ltCombo}>
          <Text style={{
              height: 40,
              fontSize: 18,
              width: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              justifyContent: 'center',
            }}>Cycle Length</Text>
          <Text style={{
              height: 40,
              fontSize: 18,
              width: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              justifyContent: 'center',
            }}>K1 Coefficient</Text>
        </View>
        <FlatList
          style={styles.flatList}
          data={dataArray}
          renderItem={({ item }) => (
            <View style={styles.ltCombo}>
              <Text style={styles.level}>{item['cycle_length']}</Text>
              <Text style={styles.level}>{item['k1_coefficient']}</Text>
            </View>
          )}
        />
        <Button title="Add New K1 Coefficient" color='darkblue' onPress={() => setAddForm(true)} />
      </View>
    );
    if (addForm === true) {
      setContent(x);
    } else {
      setContent(y);
    }
  }, [addForm, dataArray]);

  return <View style={styles.header}>{content}</View>;
};

const styles = StyleSheet.create({
  header: {

  },
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
  button: {
    width: '50%',
  },
});
