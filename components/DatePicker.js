import React, {useState, useRef} from 'react';
import {Platform, Animated} from 'react-native';
import DefaultInputButton from './InputButton';
import DefaultDoneBar from './DoneBar';
import IOSDatePicker from './IOSDatePicker';
import AndroidDatePicker from './AndroidDatePicker';

const isIOS = Platform.OS === 'ios';

const DatePicker = ({
  date,
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
  doneText,
  onDateChange,
  onOpen,
  onClose,
  disabled,
  InputComponent,
  DoneBarComponent,
}) => {
  const [pickedDate, setPickedDate] = useState(date || new Date());
  const [show, setShow] = useState(false);
  const fadeAnimationValue = useRef(new Animated.Value(0)).current;

  const handleiOSDateChange = (_, newDate) => {
    setPickedDate(newDate);
  };

  const handleAndroidDateChange = (_, newDate) => {
    togglePicker();
    if (newDate !== undefined) {
      setPickedDate(newDate);
      onDateChange(newDate);
    }
  };

  const resetValue = () => {
    onDateChange(null);
  };

  const toggle = () => {
    setShow(!show);
    show ? onOpen() : onClose();
  };

  const togglePicker = () => {
    if (disabled) {
      return;
    }

    // No animation needed for Android
    if ((isIOS && !show) || !isIOS) {
      toggle();
      return;
    }

    Animated.timing(fadeAnimationValue, {
      toValue: !show ? 0.5 : 0,
      duration: !show ? 1000 : 0,
      delay: !show ? 300 : 0,
      useNativeDriver: true,
    }).start(show ? toggle : null);

    setPickedDate(show && date ? date : pickedDate);
  };

  const onDonePress = () => {
    togglePicker();
    onDateChange(pickedDate);
  };

  const renderInputButton = () => {
    const inputProps = {
      resetValue,
      togglePicker,
      style,
      placeholder,
      placeholderStyle,
      isNullable,
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

  const datePickerProps = {
    locale,
    mode: iosPickerMode,
    show,
    disabled,
    animationValue: fadeAnimationValue,
    maximumDate: maxDate,
    minimumDate: minDate,
    date: pickedDate,
    togglePicker,
    onDateChange: isIOS ? handleiOSDateChange : handleAndroidDateChange,
    renderInput: renderInputButton,
    renderDoneBar: renderDoneBarButton,
    containerStyle: containerStyle,
  };

  return isIOS ? (
    <IOSDatePicker {...datePickerProps} />
  ) : (
    <AndroidDatePicker {...datePickerProps} />
  );
};

DatePicker.defaultProps = {
  isNullable: false,
  title: '',
  placeholder: '',
  androidPickerMode: 'calendar',
  iosPickerMode: 'date',
  locale: 'en',
  onOpen: () => null,
  onClose: () => null,
};

export default DatePicker;
