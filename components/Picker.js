// @flow
import React, { Component, PureComponent } from "react";
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
import ifIphoneX from "../helpers/ifIphoneX";

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
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: props.item
        ? props.items.find(item => item === props.item)
        : props.isNullable
        ? { value: "", label: "" }
        : props.items[0],
      showPicker: false,
      fadeAnim: new Animated.Value(0)
    };
  }

  static defaultProps = {
    isNullable: false,
    androidPickerMode: "dialog",
    title: "",
    placeholder: "",
    item: null
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

  renderPickerItems(isNullable, items) {
    const tempItems = isNullable ? [{ value: "", label: "" }, ...items] : items;
    return tempItems.map(item => {
      return (
        <RNPicker.Item label={item.label} value={item.value} key={item.label} />
      );
    });
  }

  renderPlaceholder(item, selectedItem, placeholder): string {
    if (item && item.label) {
      return item.label;
    } else if (selectedItem && selectedItem.label) {
      return selectedItem.label;
    }
    return placeholder;
  }

  renderDoneBar(title, doneText, onDonePress) {
    return (
      <View style={styles.doneBar}>
        <View style={styles.doneColumnStyle}>
          <Text>{title}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onDonePress}>
          <View style={styles.doneColumnStyle}>
            <Text style={styles.doneTextStyle}>{doneText || "Done"}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    const {
      containerStyle,
      style,
      placeholderStyle,
      androidPickerMode,
      disabled,
      title,
      doneText,
      item,
      items,
      placeholder,
      isNullable
    } = this.props;
    const { selectedItem, showPicker, fadeAnim } = this.state;
    return isIOS ? (
      <IOSWoodPicker
        containerStyle={containerStyle}
        style={style}
        placeholderStyle={placeholderStyle}
        selectedItem={selectedItem}
        showPicker={showPicker}
        fadeAnim={fadeAnim}
        renderPlaceholder={() =>
          this.renderPlaceholder(item, selectedItem, placeholder)
        }
        renderDoneBar={() =>
          this.renderDoneBar(title, doneText, this.onDonePress)
        }
        renderPickerItems={() => this.renderPickerItems(isNullable, items)}
        onItemChange={this.onItemChange}
        togglePicker={this.togglePicker}
      />
    ) : (
      <AndroidWoodPicker
        containerStyle={containerStyle}
        style={style}
        title={title}
        placeholderStyle={placeholderStyle}
        androidPickerMode={androidPickerMode}
        disabled={disabled}
        selectedItem={selectedItem}
        renderPlaceholder={() =>
          this.renderPlaceholder(item, selectedItem, placeholder)
        }
        onItemChange={this.onItemChange}
        renderPickerItems={() => this.renderPickerItems(isNullable, items)}
      />
    );
  }
}

class IOSWoodPicker extends PureComponent {
  render() {
    const {
      containerStyle,
      style,
      placeholderStyle,
      selectedItem,
      showPicker,
      renderPlaceholder,
      renderDoneBar,
      renderPickerItems,
      onItemChange,
      togglePicker,
      fadeAnim
    } = this.props;
    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={togglePicker}>
          <View style={[styles.input, style]}>
            <Text
              style={[styles.placeholderStyle, placeholderStyle]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {renderPlaceholder()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
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
          <View style={styles.iosPickerContainer}>
            <RNPicker
              onValueChange={onItemChange}
              selectedValue={selectedItem.value}
            >
              {renderPickerItems()}
            </RNPicker>
          </View>
        </Modal>
      </View>
    );
  }
}

class AndroidWoodPicker extends PureComponent {
  render() {
    const {
      containerStyle,
      style,
      title,
      placeholderStyle,
      androidPickerMode,
      disabled,
      selectedItem,
      renderPlaceholder,
      renderPickerItems,
      onItemChange
    } = this.props;
    return (
      <View style={containerStyle}>
        <View style={[styles.input, style]}>
          <Text
            style={[styles.placeholderStyle, placeholderStyle]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {renderPlaceholder()}
          </Text>
        </View>
        <View style={styles.androidPickerContainer}>
          <RNPicker
            prompt={title}
            onValueChange={onItemChange}
            selectedValue={selectedItem.value}
            mode={androidPickerMode}
            enabled={!disabled}
          >
            {renderPickerItems()}
          </RNPicker>
        </View>
      </View>
    );
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
    height: ifIphoneX(255, 215),
    justifyContent: "flex-start",
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
