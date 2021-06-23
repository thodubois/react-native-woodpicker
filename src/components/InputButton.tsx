import type { InputProps } from "../types";

import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { styles } from "../helpers/stylesHelper";

const InputButton = ({
  resetValue,
  togglePicker,
  style,
  text,
  textInputStyle,
  touchableStyle,
  isNullable,
  isCompactHiddenPickerNeeded,
  renderHiddenCompactIOSPicker,
}: InputProps): JSX.Element => {
  return (
    <View style={[styles.input, style]}>
      {isCompactHiddenPickerNeeded ? (
        <View style={[styles.placeHolderContainerStyle, touchableStyle]}>
          <Text
            style={[styles.placeholderStyle, textInputStyle]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {text}
          </Text>
          {renderHiddenCompactIOSPicker()}
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={togglePicker}>
          <View style={[styles.placeHolderContainerStyle, touchableStyle]}>
            <Text
              style={[styles.placeholderStyle, textInputStyle]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {text}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {isNullable && (
        <TouchableWithoutFeedback onPress={resetValue}>
          <View style={styles.resetButtonContainerStyle}>
            <Text style={[styles.resetButtonStyle]}>{"\u2715"}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default InputButton;
