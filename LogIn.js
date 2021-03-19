import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import VehicleForCalc from './Components/VehicleForCalc';
import CycleForCalc from './Components/CycleForCalc';
import SizeForCalc from './Components/SizeForCalc';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import Constants from 'expo-constants';
import { AntDesign, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import MovingDumper from './Components/MovingDumper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useNavigation } from '@react-navigation/native';
import { useTheme, useThemeUpdate } from './ThemeContext';

function NewCalc() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const navigation = useNavigation();

  let fileUri = '/xyz123.db';
  const db = SQLite.openDatabase(fileUri);

  const addSqlDb = () => {
    if (email === '' || firstName === '') {
      alert('Please enter required details!');
    } else {
      let values = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      console.log(values);
      db.transaction(
        (tx) => {
          Object.values(values);
          console.log(JSON.stringify(Object.keys(values)));
          const len = JSON.stringify(Object.keys(values)).length;
          const sqlFields = JSON.stringify(Object.keys(values)).slice(
            1,
            len - 1
          );
          const sqlValues = Object.values(values);

          tx.executeSql(
            `insert into user (${sqlFields}) values (?,?,?)`,
            sqlValues
          );

          tx.executeSql('select * from user', [], (_, { rows }) => {
            console.log(JSON.stringify(rows['_array']));
            toggleTheme(rows['_array'][0]['user']);
          });
        },
        null,
        null
      );
      navigation.navigate('Home');
      setEmail('');
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            padding: 10,
            paddingBottom:5
          }}>
          <Image
            source={require('./jktyre-logo.png')}
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              alignSelf: 'center',
              width: windowWidth * 0.9,
              height: windowHeight * 0.18,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            margin: 10,
            marginBottom:5,
            fontWeight: 'bold',
            textAlign: 'center',
            color:'darkred'
          }}>
          TKPH App{' '}
        </Text>
        <Text style={styles.heading}>Enter below details to continue:- </Text>

        <View style={styles.outerBox}>
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Email ID:</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter Email"
            />
          </View>
          <View style={styles.ltCombo}>
            <Text style={styles.level}>First Name:</Text>
            <TextInput
              style={styles.textInput}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholder="Enter First Name"
            />
          </View>
          <View style={styles.ltCombo}>
            <Text style={styles.level}>Last Name:</Text>
            <TextInput
              style={styles.textInput}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholder="Optional"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            addSqlDb();
          }}
          style={{
            flexDirection: 'row',
            backgroundColor: 'darkblue',
            height: 50,
            justifyContent: 'flex-start',
            paddingLeft: 35,
            width: '50%',
            alignItems: 'center',
            alignSelf: 'center',
            margin: 20,
          }}>
          <Entypo name="login" size={24} color="white" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
              padding: 20,
            }}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
      <MovingDumper />
    </>
  );
}

export default NewCalc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    margin: 1,
    height: 40,
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    width: '70%',
  },
  level: {
    height: 40,
    width: '30%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    margin: 5,
  },
  ltCombo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marigin: 10,
  },
  outerBox: {
    padding: 10,
    marginHorizontal: 'auto',
    width: '100%',
    maxWidth: 500,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
