import type { DoneBarProps } from "../types";

import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { styles } from "../helpers/stylesHelper";

const DoneBar = ({
  title,
  doneButtonLabel,
  onDonePress,
}: DoneBarProps): JSX.Element => {
  return (
    <View style={styles.doneBar}>
      <View style={styles.doneColumnStyle}>
        <Text style={styles.placeholderStyle}>{title}</Text>
      </View>
      <TouchableWithoutFeedback onPress={onDonePress}>
        <View style={styles.doneColumnStyle}>
          <Text style={styles.doneButtonLabelStyle}>
            {doneButtonLabel || "Done"}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default DoneBar;
