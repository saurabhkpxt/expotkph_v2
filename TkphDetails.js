import React, { Component, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import Header from './Header';
import {
  Card,
  DataTable,
  Subheading,
  Dialog,
  Paragraph,
} from 'react-native-paper';

export default ({ route, navigation }) => {
  const [visible, setVisible] = useState();
  let { data123 } = route.params;

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <ScrollView>
      <Card elevation={10} style={styles.card}>
        {/* Date & Time Stamp */}
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}>Date & Time Stamp</Text>
          </DataTable.Cell>
          <DataTable.Cell><Text style={{ color:'darkgreen',fontWeight:'bold'}}>{data123['date']}</Text></DataTable.Cell>
        </DataTable.Row>
        {/* Added By */}
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}>Added By</Text>
          </DataTable.Cell>
          <DataTable.Cell><Text style={{color:'darkgreen',fontWeight:'bold'}}>{data123['added_by']}</Text></DataTable.Cell>
        </DataTable.Row>
        {/* Tyre Size */}
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}> Tyre Size</Text>
          </DataTable.Cell>
          <DataTable.Cell><Text style={{color:'darkblue', fontWeight:'bold', fontSize:16}}>{data123['tyre_size']}</Text></DataTable.Cell>
        </DataTable.Row>

        {/* Vehicle Make */}
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}>Vehicle Make & Model</Text>
          </DataTable.Cell>
          <DataTable.Cell><Text style={{color:'darkblue', fontWeight:'bold', fontSize:16}}>
            {data123['vehicle_make'] + ' ' + data123['vehicle_model']}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>

        {/* Gross Vehicle Weight */}
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}>Gross Vehicle Weight</Text>
          </DataTable.Cell>

          <DataTable.Cell><Text style={{ color:'darkblue',fontWeight:'bold', fontSize:16}}>{data123['gross_vehicle_weight']}</Text></DataTable.Cell>
        </DataTable.Row>
        {/* Mine Details */}
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}>Mine Details</Text>
          </DataTable.Cell>
          
          <DataTable.Cell><Text style={{color:'darkblue', fontWeight:'bold', fontSize:16}}>{data123['mine_details']}</Text></DataTable.Cell>
        </DataTable.Row>

        {/* Distance covered (km/hour) */}
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}>Distance Covered (km/hour)</Text>
          </DataTable.Cell>
          
          <DataTable.Cell><Text style={{color:'darkblue',fontWeight:'bold', fontSize:16}}>{data123['distance_km_per_hour']}</Text></DataTable.Cell>
        </DataTable.Row>

        </Card>
             <Card elevation={10} style={styles.card}>
        {/* Load Details */}
        <Text style style={styles.heading}>
          Load Details
        </Text>

        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}>Load/tyre (Front)</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={styles.textField}>Load/tyre (Rear)</Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <Text style={{fontWeight:'bold', color:'darkblue', fontSize:16}}>{data123['avg_tyre_load_front']}</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{fontWeight:'bold', color:'darkblue', fontSize:16}}>{data123['avg_tyre_load_rear']}</Text>
          </DataTable.Cell>
        </DataTable.Row>
        </Card>

             <Card elevation={10} style={styles.card}>
          
        {/* Basic Site TKPH */}
        <Text style style={styles.heading}>
          TKPH Details
        </Text>
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}></Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={styles.textField}>Front</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={styles.textField}>Rear</Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}>Basic Site TKPH</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{fontWeight:'bold', color:'blue', fontSize:16}}>{data123['basic_site_tkph_front']}</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{fontWeight:'bold', color:'blue', fontSize:16}}>{data123['basic_site_tkph_rear']}</Text>
          </DataTable.Cell>
        </DataTable.Row>
        {/* Real Site TKPH */}

        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.textField}>Real Site TKPH</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{fontWeight:'bold', color:'blue', fontSize:16}}>{data123['real_site_tkph_front']}</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{fontWeight:'bold', color:'blue', fontSize:16}}>{data123['real_site_tkph_rear']}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textField: {
    fontSize: 15,
    fontWeight: 'bold',
    height: '50%',
    width: '50%',
    padding: 10,
    margin: 10,
  },
  textValue: {
    marginBottom: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    margin:5
  },
  heading: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'darkred',
    textDecorationLine:'underline'
  },
});
