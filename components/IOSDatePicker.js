import * as React from 'react';
import {View, Modal, Animated, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from '../helpers/stylesHelper';

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

export default IOSDatePicker;
