import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
let size1 = 60;
let width1 = 50;

export default ({ value, level, placeholder, method, size, width }) => {
  return (
    <View style={styles.ltCombo}>
      <Text style={styles.level}>{level}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={(text) => method(text)}
        placeholder={placeholder}
        placeholderTextColor={'lightyellow'}
      />
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  ltCombo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#d9d9d9',

  },

  textInput: {
    height: 50 ,
    borderColor: 'gray',
    borderWidth: 1,
    width: "50%",
    backgroundColor: 'black',
    borderRadius: 5,
    fontSize: 15,
    paddingLeft: 5,
    color: 'yellow',
  },
  level: {
    height: 50,
    width: "50%",
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
