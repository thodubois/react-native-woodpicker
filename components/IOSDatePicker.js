import * as React from 'react';
import { View, Modal, Animated, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../helpers/stylesHelper';

const IOSDatePicker = ({
  date,
  show,
  maximumDate,
  minimumDate,
  locale,
  display,
  mode,
  animationValue,
  renderInput,
  renderDoneBar,
  togglePicker,
  onDateChange,
  containerStyle,
  customProps,
}) => {

    if(display === 'compact'){
      return (
        <View style={containerStyle}>
            {renderInput()}
            <View>
                <DateTimePicker
                mode={mode}
                display={display}
                style={styles.displayCompactIOS}
                value={date}
                onChange={onDateChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                locale={locale}
                {...customProps}
                />
            </View>
        </View>
      )
    }

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
        <View style={[
            styles.iosPickerContainerStyle,
            display === 'inline' ? styles.iosPickerContainerInline : null
        ]}>
          <DateTimePicker
            mode={mode}
            display={display}
            value={date}
            onChange={onDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            locale={locale}
            {...customProps}
          />
        </View>
      </Modal>
    </View>
  );
};

export default IOSDatePicker;
