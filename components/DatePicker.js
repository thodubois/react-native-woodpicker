import React, {useState} from 'react';
import {Platform, View, Modal, Animated, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from '../helpers/stylesHelper';
import DefaultInputButton from './InputButton';
import DefaultDoneBar from './DoneBar';

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
  disabled,
  InputComponent,
  DoneBarComponent,
}) => {
  const [pickedDate, setPickedDate] = useState(date || new Date());
  const [show, setShow] = useState(false);
  const [fadeAnimationValue] = useState(new Animated.Value(0));

  const handleiOSDateChange = (event, newDate) => {
    setPickedDate(newDate);
  };

  const handleAndroidDateChange = (event, newDate) => {
    togglePicker();
    if (newDate !== undefined) {
      setPickedDate(newDate);
      onDateChange(newDate);
    }
  };

  const resetValue = () => {
    onDateChange(null);
  };

  const togglePicker = () => {
    if (disabled) {
      return;
    }

    setShow(!show);

    // No animation needed for Android
    if (!isIOS) {
      return;
    }

    Animated.timing(fadeAnimationValue, {
      toValue: !show ? 0.5 : 0,
      duration: !show ? 1000 : 0,
      delay: !show ? 300 : 0,
    }).start();

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

const AndroidDatePicker = ({
  date,
  show,
  maximumDate,
  minimumDate,
  disabled,
  locale,
  mode,
  renderInput,
  onDateChange,
  containerStyle,
}) => {
  return (
    <>
      <View style={containerStyle}>{renderInput()}</View>
      {show && !disabled && (
        <DateTimePicker
          mode={mode}
          value={date}
          onChange={onDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          locale={locale}
        />
      )}
    </>
  );
};

const IOSDatePicker = ({
  date,
  show,
  maximumDate,
  minimumDate,
  locale,
  mode,
  animationValue,
  renderInput,
  renderDoneBar,
  togglePicker,
  onDateChange,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      {renderInput()}
      <Modal
        visible={show}
        transparent
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}>
        <TouchableOpacity style={styles.blurTouchable} onPress={togglePicker}>
          <Animated.View
            style={[
              styles.animatedInput,
              {
                opacity: animationValue,
              },
            ]}
          />
        </TouchableOpacity>
        {renderDoneBar()}
        <View style={styles.iosPickerContainerStyle}>
          <DateTimePicker
            mode={mode}
            value={date}
            onChange={onDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            locale={locale}
          />
        </View>
      </Modal>
    </View>
  );
};

DatePicker.defaultProps = {
  isNullable: false,
  title: '',
  placeholder: '',
  androidPickerMode: 'calendar',
  iosPickerMode: 'date',
  locale: 'en',
};

export default DatePicker;
