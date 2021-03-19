import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Header from './Header';
import NewCalc from './NewCalc';
import Home from './Home';
import LogIn from './LogIn';
import LocalCalc from './LocalCalc';
import CloudCalc from './CloudCalc';
import TkphDetails from './TkphDetails';
import { StatusBar } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { AntDesign, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DBVehicles from './Screens/Database/DBVehicles';
import DBTyreSizes from './Screens/Database/DBTyreSizes';
import DBK1Coefficient from './Screens/Database/DBK1Coefficient';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { ThemeProvider } from './ThemeContext';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
let data_sample = [
  {
    date_stamp: '1610022038934',
    date: '07.01.2020',
    mine_details: 'RK Transport',
    tyre_size: '18.00-25',
    max_amb_temp: '35',
    cycle_length: '10',
    cycle_duration: '120',
    vehicle_make: 'CAT',
    vehicle_model: '170',
    empty_vehicle_weight: '153760',
    pay_load: '249480',
    weight_correction: '0',
    load_dist_front_unloaded: '47',
    load_dist_rear_unloaded: '53',
    load_dist_front_loaded: '33.3',
    load_dist_rear_loaded: '66.7',
    added_by: 'saurabh',
    distance_km_per_hour: '5',
    gross_vehicle_weight: '403240',
    k1_dist_coefficient: '1.12',
    k2_temp_coefficient: '0.85',
    avg_tyre_load_front: '51637',
    avg_tyre_load_rear: '43807',
    basic_site_tkph_front: '258',
    basic_site_tkph_rear: '219',
    real_site_tkph_front: '246',
    real_site_tkph_rear: '209',
  },
];

const AvailableCalc = ({ navigation }) => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        tabStyle: {
          arrangeItems: 'center',
          justifyContent: 'center',
        },
        style: {
          backgroundColor: 'lightgrey',
          arrangeItems: 'center',
          justifyContent: 'center',
        },
        activeTintColor: 'darkred',
        inactiveTintColor: 'gray',
      }}>
      <Tabs.Screen name="LocalCalc" component={LocalCalc} />
      <Tabs.Screen name="CloudCalc" component={CloudCalc} />
    </Tabs.Navigator>
  );
};
const Database = ({ navigation }) => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
        },
        tabStyle: {
          arrangeItems: 'center',
          justifyContent: 'center',
        },
        style: {
          backgroundColor: 'lightgrey',
          arrangeItems: 'center',
          justifyContent: 'center',
        },
        activeTintColor: 'darkred',
        inactiveTintColor: 'gray',
      }}>
      <Tabs.Screen name="DBVehicles" component={DBVehicles} />
      <Tabs.Screen name="DBTyreSizes" component={DBTyreSizes} />
      <Tabs.Screen name="DBK1Coefficient" component={DBK1Coefficient} />
    </Tabs.Navigator>
  );
};
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
function App() {
  const [netStatus, setNetStatus] = useState('123');
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    let fileUri = '/xyz123.db';
    const db = SQLite.openDatabase(fileUri);
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists items (date_stamp TEXT primary key not null, date TEXT,mine_details TEXT,tyre_size TEXT,max_amb_temp TEXT,cycle_length TEXT,cycle_duration TEXT,vehicle_make TEXT,vehicle_model TEXT,empty_vehicle_weight TEXT,pay_load TEXT,weight_correction TEXT,load_dist_front_unloaded TEXT,load_dist_rear_unloaded TEXT,load_dist_front_loaded TEXT,load_dist_rear_loaded TEXT,added_by TEXT,distance_km_per_hour TEXT,gross_vehicle_weight TEXT,k1_dist_coefficient TEXT,k2_temp_coefficient TEXT,avg_tyre_load_front TEXT,avg_tyre_load_rear TEXT,basic_site_tkph_front TEXT,basic_site_tkph_rear TEXT,real_site_tkph_front TEXT,real_site_tkph_rear TEXT, uploaded BOOL);'
        );

        tx.executeSql(
          'create table if not exists k1coefficient (cycle_length TEXT primary key not null, k1_coefficient TEXT);'
        );

        tx.executeSql(
          'create table if not exists user (email TEXT primary key not null, firstName TEXT, lastName TEXT);'
        );
        tx.executeSql(
          'create table if not exists tyresizes (tyre_size TEXT primary key not null);'
        );
        tx.executeSql(
          'create table if not exists vehicles1 (vehicle_id TEXT primary key not null, vehicle_make TEXT,vehicle_model TEXT,empty_vehicle_weight TEXT,pay_load TEXT,load_dist_front_unloaded TEXT,load_dist_rear_unloaded TEXT,load_dist_front_loaded TEXT,load_dist_rear_loaded TEXT);'
        );
        tx.executeSql('select * from user', [], (_, { rows }) => {
          console.log('connected to DB');
          console.log(rows['_array']);
        });
      },
      null,
      null
    );

    //db._db.close()
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AvailableCalc"
            component={AvailableCalc}
            initialParams={data_sample}
          />
            <Stack.Screen
            name="TkphDetails"
            component={TkphDetails}
            data_sample={data_sample}
          />

          <Stack.Screen name="NewCalc" component={NewCalc} />
          <Stack.Screen name="Database" component={Database} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  app: {
    flexGrow: 1,
    marginTop: StatusBar.currentHeight,
  },
});
