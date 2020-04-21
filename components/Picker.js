import React, {useState, useRef} from 'react';
import {Platform, Animated} from 'react-native';
import {Picker as RNPicker} from '@react-native-community/picker';
import DefaultInputButton from './InputButton';
import DefaultDoneBar from './DoneBar';
import IOSPicker from './IOSPicker';
import AndroidPicker from './AndroidPicker';

const isIOS = Platform.OS === 'ios';
const EMPTY_ITEM = {value: '', label: ''};

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
  DoneBarComponent,
}) => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    item
      ? items.find((current) => current === item)
      : isNullable
      ? EMPTY_ITEM
      : items[0],
  );
  const fadeAnimationValue = useRef(new Animated.Value(0)).current;

  const handleItemChange = (value) => {
    const nullableItems = isNullable ? [EMPTY_ITEM, ...items] : items;

    const newSelectedItem = nullableItems.find(
      (currentItem) => value === currentItem.value,
    );

    if (!isIOS) {
      onItemChange(newSelectedItem);
    }

    setSelectedItem(newSelectedItem);
  };

  const toggle = () => {
    setShow(!show);
    show ? onOpen() : onClose();
  };

  const togglePicker = () => {
    if (disabled) {
      return;
    }

    if (!show) {
      toggle();
    }

    Animated.timing(fadeAnimationValue, {
      toValue: !show ? 0.5 : 0,
      duration: !show ? 1000 : 0,
      delay: !show ? 300 : 0,
      useNativeDriver: true,
    }).start(show ? toggle : null);
  };

  const onDonePress = () => {
    togglePicker();
    onItemChange(selectedItem);
  };

  const renderPickerItems = () => {
    const tempItems = isNullable ? [EMPTY_ITEM, ...items] : items;
    return tempItems.map((current) => {
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
      isNullable: false,
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
      onDonePress,
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
    animationValue: fadeAnimationValue,
  };

  return isIOS ? (
    <IOSPicker {...pickerProps} />
  ) : (
    <AndroidPicker {...pickerProps} />
  );
};

Picker.defaultProps = {
  isNullable: false,
  androidPickerMode: 'dialog',
  title: '',
  placeholder: '',
  item: null,
  onOpen: () => null,
  onClose: () => null,
};

export default Picker;
