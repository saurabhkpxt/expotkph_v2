import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

import {useTheme, useThemeUpdate} from './ThemeContext'

export default ({ user, email, logOut }) => {
  const darkTheme=useTheme()
  const navigation = useNavigation();
  let statusColor = 'green';
  console.log(darkTheme)


  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          height: 65,
          justifyContent: 'space-between',
          backgroundColor: 'white',
          alignItems: 'center',
          paddingTop: 15,
          paddingBottom: 5,
          borderBottomColor: 'darkblue',
          borderBottomWidth: 5,
          borderTopColor: 'darkblue',
          borderTopWidth: 3,
        }}>
        <Image
          source={require('./assets/jktyre-logo.png')}
          style={{ width: 150, height: 45, padding: 10 }}
        />
        <View style={{ flexDirection: 'row', margin: 5, paddingLeft: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AvailableCalc')}
            style={{
              backgroundColor: 'darkgreen',
              height: 50,
              padding: 5,
              justifyContent: 'flex-start',
              alignItems: 'center',

              marginRight: 5,
              marginBottom: 10,
            }}>
            <AntDesign name="user" size={15} color="white" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#fff',
                margin: 5,
              }}>
              {darkTheme}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logOut();
            }}
            style={{
              backgroundColor: 'black',
              height: 50,
              padding: 5,
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <SimpleLineIcons name="logout" size={15} color="white" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#fff',
                margin: 5,
              }}>
              LogOut
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
