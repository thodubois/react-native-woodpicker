/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { Picker, DatePicker } from "react-native-woodpicker";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

type State = {
  pickedDate: Date,
  pickedData: { label: string, value: number }
};

export default class App extends Component<Props, State> {
  state = {
    pickedDate: null,
    pickedData: null
  };

  data = [
    { label: "DataCat", value: 1 },
    { label: "DataDog", value: 2 },
    { label: "DataSnake", value: 3 },
    { label: "DataPlatypus", value: 4 },
    { label: "DataWhale", value: 5 }
  ];

  handlePicker = data => {
    this.setState({ pickedData: data });
  };

  handleDatePicker = date => {
    this.setState({ pickedDate: date });
  };

  handlePlaceholder = () =>
    this.state.pickedDate
      ? this.state.pickedDate.toDateString()
      : "No value Selected";

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <DatePicker
          style={styles.pickerStyle}
          onDateChange={this.handleDatePicker}
          date={this.state.pickedDate}
          title="Date Picker"
          placeholder={this.handlePlaceholder()}
          isNullable
          //minDate={new Date(Date.now())}
          //maxDate={new Date(Date.now()+2000000000)}
          //iosPickerMode="date"
          //androidPickerMode="spinner"
          //locale="fr"
        />
        <Button
          title="Set Today"
          onPress={() => this.handleDatePicker(new Date())}
        />

        <Picker
          style={styles.pickerStyle}
          onItemChange={this.handlePicker}
          items={this.data}
          title="Data Picker"
          placeholder="Select Data"
          item={this.state.pickedData}
          isNullable
          //androidPickerMode="dropdown"
        />
        <Button
          title="Set Value"
          onPress={() => this.handlePicker(this.data[1])}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  pickerStyle: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    height: 40,
    width: 200
  }
});
