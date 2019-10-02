// @flow
import React, { Component, PureComponent } from "react";
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
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import ifIphoneX from "../helpers/ifIphoneX";

type Props = {
  containerStyle?: ViewStyle,
  placeholderStyle?: ViewStyle,
  style?: ViewStyle,
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
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      fadeAnim: new Animated.Value(0),
      pickedDate: props.date || new Date()
    };
  }

  static defaultProps = {
    isNullable: false,
    title: "",
    placeholder: "",
    androidPickerMode: "calendar",
    iosPickerMode: "date",
    locale: "en"
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

  renderDoneBar(title, doneText, onDonePress) {
    return (
      <View style={styles.doneBar}>
        <View style={styles.doneColumnStyle}>
          <Text style={styles.placeholderStyle}>{title}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onDonePress}>
          <View style={styles.doneColumnStyle}>
            <Text style={styles.doneTextStyle}>{doneText || "Done"}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderInput(onPressInput, style, placeholder, placeholderStyle, isNullable) {
    return (
      <View style={[styles.input, style]}>
        <TouchableWithoutFeedback onPress={onPressInput}>
          <View style={styles.placeHolderContainerStyle}>
            <Text
              style={[styles.placeholderStyle, placeholderStyle]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {placeholder}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {isNullable && (
          <TouchableWithoutFeedback onPress={this.resetSelectedValue}>
            <View style={styles.resetButtonContainerStyle}>
              <Text style={[styles.resetButtonStyle]}>{"\u2715"}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }

  render() {
    const {
      containerStyle,
      locale,
      iosPickerMode,
      placeholder,
      placeholderStyle,
      style,
      minDate,
      maxDate,
      isNullable,
      title,
      doneText
    } = this.props;
    const { showPicker, fadeAnim, pickedDate } = this.state;
    return isIOS ? (
      <IOSDateWoodPicker
        containerStyle={containerStyle}
        locale={locale}
        iosPickerMode={iosPickerMode}
        showPicker={showPicker}
        fadeAnim={fadeAnim}
        maxDate={maxDate}
        minDate={minDate}
        pickedDate={pickedDate}
        togglePicker={this.togglePicker}
        onDateChange={this.onDateChange}
        renderInput={() =>
          this.renderInput(
            this.togglePicker,
            style,
            placeholder,
            placeholderStyle,
            isNullable
          )
        }
        renderDoneBar={() =>
          this.renderDoneBar(title, doneText, this.onDonePress)
        }
      />
    ) : (
      <AndroidDateWoodPicker
        containerStyle={containerStyle}
        renderInput={() =>
          this.renderInput(
            this.handleAndroidDatePicker,
            style,
            placeholder,
            placeholderStyle,
            isNullable
          )
        }
      />
    );
  }
}

class IOSDateWoodPicker extends PureComponent {
  render() {
    const {
      containerStyle,
      renderInput,
      renderDoneBar,
      showPicker,
      togglePicker,
      fadeAnim,
      minDate,
      maxDate,
      pickedDate,
      onDateChange,
      locale,
      iosPickerMode
    } = this.props;
    return (
      <View style={containerStyle}>
        {renderInput()}
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          supportedOrientations={["portrait", "landscape"]}
        >
          <TouchableOpacity style={styles.blurTouchable} onPress={togglePicker}>
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: "#000000",
                opacity: fadeAnim
              }}
            />
          </TouchableOpacity>
          {renderDoneBar()}
          <View style={styles.iosPickerContainerStyle}>
            <DatePickerIOS
              mode="date"
              date={pickedDate}
              onDateChange={onDateChange}
              minimumDate={minDate}
              maximumDate={maxDate}
              locale={locale}
              mode={iosPickerMode}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

class AndroidDateWoodPicker extends PureComponent {
  render() {
    const { containerStyle, renderInput } = this.props;
    return <View style={containerStyle}>{renderInput()}</View>;
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
    height: ifIphoneX(255, 215),
    justifyContent: "flex-start",
    backgroundColor: "white"
  },
  resetButtonStyle: Platform.select({
    android: { fontSize: 18 },
    ios: { fontSize: 20 }
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
