// @flow
import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Modal,
  Animated,
  Text,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
  containerStyle?: StyleObj,
  placeholderStyle?: StyleObj,
  style?: StyleObj,
  onDateChange: (date: ?Date) => {},
  date: Date,
  disabled?: boolean,
  title?: string,
  placeholder: string,
  isNullable?: boolean,
  locale: string,
  iosPickerMode: "date" | "time" | "datetime",
  androidPickerMode: "calendar" | "spinner" | "default",
  minDate: Date,
  maxDate: Date
};

type State = {
  showPicker: boolean,
  fadeAnim: Animated.Value,
  pickedDate: Date
};

const isIOS = Platform.OS === "ios";

class DatePicker extends Component<Props, State> {
  static defaultProps = {
    isNullable: false,
    title: "",
    placeholder: "",
    androidPickerMode: "calendar",
    iosPickerMode: "date",
    locale: "en"
  };

  state = {
    showPicker: false,
    fadeAnim: new Animated.Value(0),
    pickedDate: this.props.date || new Date()
  };

  onDateChange = (date: Date) => {
    this.setState({
      pickedDate: date
    });
  };

  onDonePress = () => {
    this.togglePicker();
    this.props.onDateChange(this.state.pickedDate);
  };

  handleAndroidDatePicker = async () => {
    const options = {
      date: this.props.date || new Date(),
      mode: this.props.androidPickerMode
    };
    if (this.props.minDate) {
      options.minDate = this.props.minDate;
    }
    if (this.props.maxDate) {
      options.maxDate = this.props.maxDate;
    }
    try {
      const { action, year, month, day } = await DatePickerAndroid.open(
        options
      );
      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day);
        this.onDateChange(newDate);
        this.props.onDateChange(newDate);
      }
    } catch (error) {
      // do nothing
    }
  };

  resetSelectedValue = () => {
    this.props.onDateChange(null);
  };

  togglePicker = () => {
    if (this.props.disabled) {
      return;
    }

    this.setState(({ showPicker, fadeAnim, pickedDate }) => {
      Animated.timing(fadeAnim, {
        toValue: !showPicker ? 0.5 : 0,
        duration: !showPicker ? 1000 : 0,
        delay: !showPicker ? 300 : 0
      }).start();
      return {
        pickedDate:
          !showPicker && this.props.date ? this.props.date : pickedDate,
        showPicker: !showPicker
      };
    });
  };

  renderDoneBar() {
    return (
      <View style={styles.doneBar}>
        <View style={styles.doneColumnStyle}>
          <Text style={styles.placeholderStyle}>{this.props.title}</Text>
        </View>
        <TouchableWithoutFeedback onPress={this.onDonePress}>
          <View style={styles.doneColumnStyle}>
            <Text style={styles.doneTextStyle}>
              {this.props.doneText || "Done"}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderInput = (onPressInput: () => any) => {
    return (
      <View style={[styles.input, this.props.style]}>
        <TouchableWithoutFeedback onPress={onPressInput}>
          <View style={styles.placeHolderContainerStyle}>
            <Text
              style={[styles.placeholderStyle, this.props.placeholderStyle]}
            >
              {this.props.placeholder}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {this.props.isNullable && (
          <TouchableWithoutFeedback onPress={this.resetSelectedValue}>
            <View style={styles.resetButtonContainerStyle}>
              <Text style={[styles.resetButtonStyle]}>{"\u292b"}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  };

  renderIOS() {
    return (
      <View style={this.props.containerStyle}>
        {this.renderInput(this.togglePicker)}
        <Modal
          visible={this.state.showPicker}
          transparent
          animationType="slide"
          supportedOrientations={["portrait", "landscape"]}
        >
          <TouchableOpacity
            style={styles.blurTouchable}
            onPress={this.togglePicker}
          >
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: "#000000",
                opacity: this.state.fadeAnim
              }}
            />
          </TouchableOpacity>
          {this.renderDoneBar()}
          <View style={styles.iosPickerContainerStyle}>
            <DatePickerIOS
              mode="date"
              date={this.state.pickedDate}
              onDateChange={this.onDateChange}
              locale={this.props.locale}
              mode={this.props.iosPickerMode}
            />
          </View>
        </Modal>
      </View>
    );
  }

  renderAndroid() {
    return (
      <View style={this.props.containerStyle}>
        {this.renderInput(this.handleAndroidDatePicker)}
      </View>
    );
  }

  render() {
    return isIOS ? this.renderIOS() : this.renderAndroid();
  }
}

const styles = StyleSheet.create({
  blurTouchable: {
    flex: 1,
    marginTop: -50
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center"
  },
  placeholderStyle: { color: "black", fontSize: 16 },
  doneBar: {
    height: 44,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFF1F2",
    borderTopWidth: 0.5,
    borderTopColor: "#919498"
  },
  doneTextStyle: {
    fontSize: 20
  },
  doneColumnStyle: {
    marginHorizontal: 8
  },
  iosPickerContainerStyle: {
    height: 215,
    justifyContent: "center",
    backgroundColor: "white"
  },
  resetButtonStyle: Platform.select({
    android: { fontSize: 30, top: -2 },
    ios: { fontSize: 16, top: -2 }
  }),
  resetButtonContainerStyle: {
    width: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  placeHolderContainerStyle: {
    flexGrow: 9
  }
});

export default DatePicker;
