import * as React from 'react';
import {View} from 'react-native';
import RNPicker from '@react-native-community/datetimepicker';
import {styles} from '../helpers/stylesHelper';

const AndroidPicker = ({
  selectedItem,
  disabled,
  title,
  androidPickerMode,
  renderInput,
  renderPickerItems,
  onItemChange,
  containerStyle,
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
        enabled={!disabled}>
        {renderPickerItems()}
      </RNPicker>
    </View>
  );
};

export default AndroidPicker;
