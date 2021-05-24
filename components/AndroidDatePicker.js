import * as React from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AndroidDatePicker = ({
  date,
  show,
  maximumDate,
  minimumDate,
  disabled,
  display,
  locale,
  mode,
  renderInput,
  onDateChange,
  containerStyle,
  customProps,
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
          display={display}
          locale={locale}
          {...customProps}
        />
      )}
    </>
  );
};

export default AndroidDatePicker;
