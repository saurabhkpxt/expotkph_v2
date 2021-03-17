import React, { Component, useState } from 'react';
import { Button, Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from './Header';
import {
  Card,
  DataTable,
  Subheading,
  Dialog,
  Paragraph,
} from 'react-native-paper';

export default ({ navigation, data_sample, deleteRecord }) => {
  const [visible, setVisible] = useState();

  const showDialog = () =>
    navigation.navigate('TkphDetails', { data123: data_sample });

  const hideDialog = () => setVisible(false);
  let disabled = false;
  if (data_sample['uploaded'] === 0) {
    disabled = false;
  } else {
    disabled = true;
  }

  return (
    <Card elevation={10} style={styles.card} onPress={showDialog}>
      <View style={styles.heading}>
        <Subheading style={styles.subheading}>
          {data_sample['mine_details']}
        </Subheading>
      </View>

      <DataTable.Row>
        <DataTable.Cell>Vehicle Make & Model</DataTable.Cell>
        <DataTable.Cell>
          <Text style={{ fontSize: 14, color: 'green', fontWeight: 'bold' }}>
            {data_sample['vehicle_make'] + ' ' + data_sample['vehicle_model']}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Tyre Size</DataTable.Cell>
        <DataTable.Cell>
          <Text style={{ fontSize: 14, color: 'blue', fontWeight: 'bold' }}>
            {data_sample['tyre_size']}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Added By</DataTable.Cell>
        <DataTable.Cell>
          {' '}
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
            {data_sample['added_by']}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell style>Date & Time Stamp</DataTable.Cell>
        <DataTable.Cell>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
            {data_sample['date']}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>

      <View style={styles.buttonbox}>
        <View style={styles.button}>
          <Button
            color="darkblue"
            title="Upload"
            disabled={disabled}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <View style={styles.button}>
          <Button
            color="darkred"
            title="Delete"
            onPress={() => deleteRecord(data_sample['date_stamp'])}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
  },
  logo: {
    height: 80,
  },
  card: {
    marginBottom: 10,
  },
  heading: {
    marginBottom: 10,
    alignItems: 'center',
  },
  subheading: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'blue',
  },
  buttonbox: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
  },
  button: {
    width: '50%',
  },
});
