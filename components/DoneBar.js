import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from '../helpers/stylesHelper';

function DoneBar({title, doneText, onDonePress}) {
  return (
    <View style={styles.doneBar}>
      <View style={styles.doneColumnStyle}>
        <Text style={styles.placeholderStyle}>{title}</Text>
      </View>
      <TouchableWithoutFeedback onPress={onDonePress}>
        <View style={styles.doneColumnStyle}>
          <Text style={styles.doneTextStyle}>{doneText || 'Done'}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default DoneBar;
