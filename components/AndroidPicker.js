import * as React from 'react';
import { View } from 'react-native';
import { Picker as RNPicker } from '@react-native-community/picker';
import { styles } from '../helpers/stylesHelper';

const AndroidPicker = ({
  selectedItem,
  disabled,
  title,
  androidPickerMode,
  renderInput,
  renderPickerItems,
  onItemChange,
  containerStyle,
  customProps
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
        {...customProps}>
        {renderPickerItems()}
      </RNPicker>
    </View>
  );
};

export default AndroidPicker;
