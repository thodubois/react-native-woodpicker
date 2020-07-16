import * as React from 'react';
import { View, Modal, Animated, TouchableOpacity } from 'react-native';
import { Picker as RNPicker } from '@react-native-community/picker';
import { styles } from '../helpers/stylesHelper';

const IOSPicker = ({
  selectedItem,
  disabled,
  show,
  title,
  androidPickerMode,
  renderInput,
  renderDoneBar,
  renderPickerItems,
  onItemChange,
  togglePicker,
  containerStyle,
  animationValue,
  customProps
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
        <RNPicker
          style={styles.iosPickerContainer}
          prompt={title}
          onValueChange={onItemChange}
          selectedValue={selectedItem.value}
          mode={androidPickerMode}
          enabled={!disabled}
          {...customProps}>
          {renderPickerItems()}
        </RNPicker>
      </Modal>
    </View>
  );
};

export default IOSPicker;
