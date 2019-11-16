import React, { useState } from "react";
import {
  Platform,
  View,
  Picker as RNPicker,
  Modal,
  Animated,
  TouchableOpacity
} from "react-native";
import { styles } from "../helpers/stylesHelper";
import DefaultInputButton from "./InputButton";
import DefaultDoneBar from "./DoneBar";

const isIOS = Platform.OS === "ios";

const Picker = ({
  item,
  items,
  disabled,
  placeholder,
  title,
  androidPickerMode,
  doneText,
  isNullable,
  onItemChange,
  onOpen,
  onClose,
  style,
  containerStyle,
  placeholderStyle,
  InputComponent,
  DoneBarComponent
}) => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    item
      ? items.find(current => current === item)
      : isNullable
      ? { value: "", label: "" }
      : items[0]
  );
  const [fadeAnimationValue] = useState(new Animated.Value(0));

  const handleItemChange = value => {
    const nullableItems = isNullable
      ? [{ value: "", label: "" }, ...items]
      : items;

    const newSelectedItem = nullableItems.find(
      currentItem => value === currentItem.value
    );

    if (!isIOS) {
      onItemChange(newSelectedItem);
    }

    setSelectedItem(newSelectedItem);
  };

  const togglePicker = () => {
    if (disabled) {
      return;
    }

    setShow(!show);

    show ? onOpen() : onClose();

    Animated.timing(fadeAnimationValue, {
      toValue: !show ? 0.5 : 0,
      duration: !show ? 1000 : 0,
      delay: !show ? 300 : 0
    }).start();
  };

  const onDonePress = () => {
    togglePicker();
    onItemChange(selectedItem);
  };

  const renderPickerItems = () => {
    const tempItems = isNullable ? [{ value: "", label: "" }, ...items] : items;
    return tempItems.map(current => {
      return (
        <RNPicker.Item
          label={current.label}
          value={current.value}
          key={current.label}
        />
      );
    });
  };

  const renderPlaceholder = () => {
    if (item && item.label) {
      return item.label;
    }
    return placeholder;
  };

  const renderInputButton = () => {
    const inputProps = {
      togglePicker,
      style,
      placeholder: renderPlaceholder(),
      placeholderStyle,
      isNullable: false
    };
    const RenderComponent = InputComponent
      ? InputComponent
      : DefaultInputButton;
    return <RenderComponent {...inputProps} />;
  };

  const renderDoneBarButton = () => {
    const barProps = {
      title,
      doneText,
      onDonePress
    };
    const RenderComponent = DoneBarComponent
      ? DoneBarComponent
      : DefaultDoneBar;
    return <RenderComponent {...barProps} />;
  };

  const pickerProps = {
    selectedItem,
    disabled,
    show,
    title,
    androidPickerMode,
    renderPlaceholder,
    renderInput: renderInputButton,
    renderDoneBar: renderDoneBarButton,
    renderPickerItems,
    onItemChange: handleItemChange,
    togglePicker,
    style,
    containerStyle,
    placeholderStyle,
    animationValue: fadeAnimationValue
  };

  return isIOS ? (
    <IOSPicker {...pickerProps} />
  ) : (
    <AndroidPicker {...pickerProps} />
  );
};

const IOSPicker = ({
  selectedItem,
  disabled,
  show,
  title,
  androidPickerMode,
  renderInput,
  renderDoneBar,
  renderPickerItems,
  onItemChange,
  togglePicker,
  containerStyle,
  animationValue
}) => {
  return (
    <View style={containerStyle}>
      {renderInput()}
      <Modal
        visible={show}
        transparent
        animationType="slide"
        supportedOrientations={["portrait", "landscape"]}
      >
        <TouchableOpacity style={styles.blurTouchable} onPress={togglePicker}>
          <Animated.View
            style={[
              styles.animatedInput,
              {
                opacity: animationValue
              }
            ]}
          />
        </TouchableOpacity>
        {renderDoneBar()}
        <RNPicker
          style={styles.iosPickerContainer}
          prompt={title}
          onValueChange={onItemChange}
          selectedValue={selectedItem.value}
          mode={androidPickerMode}
          enabled={!disabled}
        >
          {renderPickerItems()}
        </RNPicker>
      </Modal>
    </View>
  );
};

const AndroidPicker = ({
  selectedItem,
  disabled,
  title,
  androidPickerMode,
  renderInput,
  renderPickerItems,
  onItemChange,
  containerStyle
}) => {
  return (
    <View style={containerStyle}>
      {renderInput()}
      <RNPicker
        style={styles.androidPickerContainer}
        prompt={title}
        onValueChange={onItemChange}
        selectedValue={selectedItem.value}
        mode={androidPickerMode}
        enabled={!disabled}
      >
        {renderPickerItems()}
      </RNPicker>
    </View>
  );
};

Picker.defaultProps = {
  isNullable: false,
  androidPickerMode: "dialog",
  title: "",
  placeholder: "",
  item: null,
  onOpen: () => null,
  onClose: () => null
};

export default Picker;
