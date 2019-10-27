/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {Platform, StyleSheet, View, Text, Button} from 'react-native';
import {DatePicker, Picker} from 'react-native-woodpicker';

const data = [
  {label: 'DataCat', value: 1},
  {label: 'DataDog', value: 2},
  {label: 'DataSnake', value: 3},
  {label: 'DataPlatypus', value: 4},
  {label: 'DataWhale', value: 5},
];

const App = () => {
  const [pickedDate, setPickedDate] = useState(null);
  const [pickedData, setPickedData] = useState(null);

  const instructions = Platform.select({
    ios: 'Welcome to the iOS Example App for react-native-woodpicker. Enjoy!',
    android:
      'Welcome to the Android Example App for react-native-woodpicker. Enjoy!',
  });

  const handlePlaceholder = () =>
    pickedDate ? pickedDate.toDateString() : 'No value Selected';

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text>
      <Picker
        style={styles.pickerStyle}
        onItemChange={setPickedData}
        items={data}
        title="Data Picker"
        placeholder="Select Data"
        item={pickedData}
        isNullable
        //androidPickerMode="dropdown"
      />
      <Button title="Set Value" onPress={() => setPickedData(data[1])} />
      <DatePicker
        style={styles.pickerStyle}
        onDateChange={setPickedDate}
        date={pickedDate}
        title="Date Picker"
        placeholder={handlePlaceholder()}
        isNullable
        //minDate={new Date(Date.now())}
        //maxDate={new Date(Date.now()+2000000000)}
        //iosPickerMode="date"
        //androidPickerMode="spinner"
        //locale="fr"
      />
      <Button title="Set Today" onPress={() => setPickedDate(new Date())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  pickerStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    height: 40,
    width: 200,
  },
});

export default App;
