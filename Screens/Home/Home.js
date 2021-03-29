import React, { Component, useEffect, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Header from '../../Header';
import ResetDatabase from '../../Components/ResetDatabase';
import MovingDumper from '../../Components/MovingDumper';
import Constants from 'expo-constants';
import { AntDesign, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import ThemeProvider from '../../ThemeContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useTheme, useThemeUpdate} from '../../ThemeContext'

export default ({ navigation, route }) => {
  const [user, setUser] = useState('user');
  const [email, setEmail] = useState('email');
  const [reload, setReload] = useState(false);

  const darkTheme=useTheme()
  const toggleTheme=useThemeUpdate()

  useEffect(() => {
    let fileUri = '/xyz123.db';
    const db = SQLite.openDatabase(fileUri);
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists user (email TEXT primary key not null, firstName TEXT, lastName TEXT);'
        );
        tx.executeSql('select * from user', [], (_, { rows }) => {
          console.log('connected to DB');
          console.log(rows['_array']);
          if (rows['_array'].length === 0) {
            console.log('no user');
            navigation.navigate('LogIn');
            toggleTheme('user')
          } else {
            console.log(rows['_array']);
            setUser(rows['_array'][0]['firstName']);
            setEmail(rows['_array'][0]['email']);
            toggleTheme(rows['_array'][0]['firstName'])
          }
        });
      },
      null,
      null
    );
    //db._db.close()
  }, [reload, toggleTheme]);
    const logOut = () => {
    let fileUri = '/xyz123.db';
    const db = SQLite.openDatabase(fileUri);

    db.transaction(
      (tx) => {
        tx.executeSql(`delete from user where email ='${email}'`, []);
      },
      null,
      null
    );
    toggleTheme('user')
    setReload(!reload)

    console.log('logged out')
    //unavigation.navigate('LogIn')
  };


  return (
    <>
      <View style={{ marginTop: Constants.statusBarHeight }}>
        <Header user={user} email={email} logOut={logOut} />

        {/* Add new calculation*/}
        <TouchableOpacity
          onPress={() => navigation.navigate('NewCalc')}
          style={{
            flexDirection: 'row',
            backgroundColor: 'darkblue',
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 35,
            margin: 20,
            marginTop: 50,
          }}>
          <Entypo name="add-to-list" size={24} color="white" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#fff',
              padding: 20,
            }}>
            ADD NEW CALCULATION
          </Text>
        </TouchableOpacity>

        {/* Available Calculations*/}
        <TouchableOpacity
          onPress={() => navigation.navigate('AvailableCalc')}
          style={{
            flexDirection: 'row',
            backgroundColor: 'darkred',
            height: 50,
            justifyContent: 'flex-start',
            paddingLeft: 35,
            alignItems: 'center',
            margin: 20,
          }}>
          <Entypo name="calculator" size={24} color="white" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#fff',
              padding: 20,
            }}>
            AVAILABLE CALCULATIONS
          </Text>
        </TouchableOpacity>

        {/* Database*/}
        <TouchableOpacity
          onPress={() => navigation.navigate('Database')}
          style={{
            flexDirection: 'row',
            backgroundColor: 'darkgreen',
            height: 50,
            justifyContent: 'flex-start',
            paddingLeft: 35,
            alignItems: 'center',
            margin: 20,
          }}>
          <Entypo name="database" size={24} color="white" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#fff',
              padding: 20,
            }}>
            DATABASE
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            position: 'absolute',
            top: windowHeight * 0.5,
            padding: 10,
            opacity:0.1
          }}>
          
          <Image
            source={require('../../dumper-logo.jpg')}
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              alignSelf: 'center',
              width: 350,
              height: windowHeight * 0.4,
            }}
          />
         
        </View>
  
      </View>
       <MovingDumper/>
      </>

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
