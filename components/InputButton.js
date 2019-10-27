import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from '../helpers/stylesHelper';

function InputButton({
  resetValue,
  togglePicker,
  style,
  placeholder,
  placeholderStyle,
  isNullable,
}) {
  return (
    <View style={[styles.input, style]}>
      <TouchableWithoutFeedback onPress={togglePicker}>
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
        <TouchableWithoutFeedback onPress={resetValue}>
          <View style={styles.resetButtonContainerStyle}>
            <Text style={[styles.resetButtonStyle]}>{'\u2715'}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

export default InputButton;
