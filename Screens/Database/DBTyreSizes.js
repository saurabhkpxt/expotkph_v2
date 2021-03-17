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

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default ({ navigation }) => {
  const [si, setSi] = useState();
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [addForm, setAddForm] = useState(false);
  const [content, setContent] = useState(<View></View>);
  const [dataArray, setDataArray] = useState();
  let fileUri = '/xyz123.db';
  const db = SQLite.openDatabase(fileUri);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql('select * from tyresizes', [], (_, { rows }) => {
          console.log('connected to DB');
          console.log(rows['_array']);
          setDataArray(rows['_array']);
        });
      },
      null,
      null
    );
  }, []);

  function addK1Coefficient({input_value}) {
    console.log('adding');
    const values = {
      tyre_size: input_value['tyre_size'],
    };
    console.log(values);
    console.log(input_value['tyre_size']);

    db.transaction(
      (tx) => {
        const len = JSON.stringify(Object.keys(values)).length;
        const sqlFields = JSON.stringify(Object.keys(values)).slice(1, len - 1);
        const sqlValues = Object.values(values);

        tx.executeSql(
          `insert into tyresizes (${sqlFields}) values (?)`,
          sqlValues
        );
        tx.executeSql('select * from tyresizes', [], (_, { rows }) => {
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
  let input_value={tyre_size:""}

  useEffect(() => {
    let x = (
      <View>
        <Text>Add New Coefficient</Text>
        <View style={styles.ltCombo}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              setSi(text);
              input_value['tyre_size'] = text;
            }}
            placeholder="Enter cycle length"
          />
        </View>
        <Button title="Add" onPress={() => addK1Coefficient({ input_value })} />
        <Button title="Cancel" onPress={() => setAddForm(false)} />
      </View>
    );
    let y = (
      <View>
        <Text>K1 Coefficient</Text>
        <View style={styles.ltCombo}>
          <Text style={styles.level}>Tyre Sizes</Text>
        </View>
        <FlatList
          style={styles.flatList}
          data={dataArray}
          renderItem={({ item }) => (
            <View style={styles.ltCombo}>
              <Text style={styles.level}>{item['tyre_size']}</Text>
            </View>
          )}
        />
        <Button title="Show Form" onPress={() => setAddForm(true)} />
      </View>
    );
    if (addForm === true) {
      setContent(x);
    } else {
      setContent(y);
    }
  }, [addForm, dataArray]);

  return (
    <View style={styles.header}>
      <Header />
      {content}
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
  level: {
    height: 40,
    width: '100%',
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
