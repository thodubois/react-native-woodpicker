// @flow
import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Picker as RNPicker,
  Modal,
  Animated,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
  containerStyle?: StyleObj,
  placeholderStyle?: StyleObj,
  style?: StyleObj,
  onItemChange: (value: { label: string, value: any }) => {},
  items: Array<{ label: string, value: any }>,
  androidPickerMode?: "dialog" | "dropdown",
  disabled?: boolean,
  title?: string,
  placeholder?: string,
  item: { label: string, value: any },
  isNullable?: boolean
};

type State = {
  items: Array<{ label: string, value: any }>,
  selectedItem: { label: string, value: any },
  showPicker: boolean,
  fadeAnim: Animated.Value
};

const isIOS = Platform.OS === "ios";

class Picker extends Component<Props, State> {
  static defaultProps = {
    isNullable: false,
    androidPickerMode: "dialog",
    title: "",
    placeholder: ""
  };

  state = {
    selectedItem:
      this.props.item !== null
        ? this.props.items.find(item => item === this.props.item)
        : this.props.isNullable
          ? { value: "", label: "" }
          : this.props.items[0],
    showPicker: false,
    fadeAnim: new Animated.Value(0)
  };

  onItemChange = (value: any) => {
    const items = this.props.isNullable
      ? [{ value: "", label: "" }, ...this.props.items]
      : this.props.items;

    const newSelectedItem = items.find(item => value === item.value);

    if (!isIOS) {
      this.props.onItemChange(newSelectedItem);
    }

    this.setState({
      selectedItem: newSelectedItem
    });
  };

  onDonePress = () => {
    this.togglePicker();
    this.props.onItemChange(this.state.selectedItem);
  };

  togglePicker = () => {
    if (this.props.disabled) {
      return;
    }

    this.setState(({ showPicker, fadeAnim, selectedItem }) => {
      Animated.timing(fadeAnim, {
        toValue: !showPicker ? 0.5 : 0,
        duration: !showPicker ? 1000 : 0,
        delay: !showPicker ? 200 : 0
      }).start();
      return {
        selectedItem:
          !showPicker && this.props.item ? this.props.item : selectedItem,
        showPicker: !showPicker
      };
    });
  };

  renderPickerItems() {
    const items = this.props.isNullable
      ? [{ value: "", label: "" }, ...this.props.items]
      : this.props.items;
    return items.map(item => {
      return (
        <RNPicker.Item label={item.label} value={item.value} key={item.label} />
      );
    });
  }

  renderPlaceholder = (): string => {
    if (this.props.item && this.props.item.label) {
      return this.props.item.label;
    } else {
      if (!this.props.isNullable) {
        return this.state.selectedItem.label;
      }
    }
    return this.props.placeholder;
  };

  renderDoneBar() {
    return (
      <View style={styles.doneBar}>
        <View style={styles.doneColumnStyle}>
          <Text>{this.props.title}</Text>
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

  renderIOS = () => {
    return (
      <View style={this.props.containerStyle}>
        <TouchableWithoutFeedback onPress={this.togglePicker}>
          <View style={[styles.input, this.props.style]}>
            <Text
              style={[styles.placeholderStyle, this.props.placeholderStyle]}
            >
              {this.renderPlaceholder()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
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
          <View style={styles.iosPickerContainer}>
            <RNPicker
              onValueChange={this.onItemChange}
              selectedValue={this.state.selectedItem.value}
            >
              {this.renderPickerItems()}
            </RNPicker>
          </View>
        </Modal>
      </View>
    );
  };

  renderAndroid() {
    return (
      <View style={this.props.containerStyle}>
        <View style={[styles.input, this.props.style]}>
          <Text style={[styles.placeholderStyle, this.props.placeholderStyle]}>
            {this.renderPlaceholder()}
          </Text>
        </View>
        <View style={styles.androidPickerContainer}>
          <RNPicker
            prompt={this.props.title}
            onValueChange={this.onItemChange}
            selectedValue={this.state.selectedItem.value}
            mode={this.props.androidPickerMode}
            enabled={!this.props.disabled}
          >
            {this.renderPickerItems()}
          </RNPicker>
        </View>
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
    justifyContent: "center"
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
  iosPickerContainer: {
    height: 215,
    justifyContent: "center",
    backgroundColor: "white"
  },
  androidPickerContainer: {
    opacity: 0,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  doneTextStyle: {
    fontSize: 20
  },
  doneColumnStyle: {
    marginHorizontal: 8
  },
  placeHolderContainerStyle: {
    flexGrow: 9
  }
});

export default Picker;
