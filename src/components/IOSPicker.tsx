import React from "react";
import type { PickerItem } from "../types";

import {
  View,
  Modal,
  Animated,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { styles } from "../helpers/stylesHelper";

export type Props = {
  selectedItem: any;
  disabled?: boolean;
  show: boolean;
  title?: string;
  renderInput: () => JSX.Element;
  renderDoneBar: () => JSX.Element;
  renderPickerItems: () => Array<JSX.Element>;
  onItemChange: (item: PickerItem, index: number) => void;
  togglePicker: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
  animationValue: Animated.Value;
  customProps: { [key: string]: any };
};

const IOSPicker = ({
  selectedItem,
  disabled,
  show,
  title,
  renderInput,
  renderDoneBar,
  renderPickerItems,
  onItemChange,
  togglePicker,
  containerStyle,
  animationValue,
  customProps,
}: Props): JSX.Element => {
  return (
    <View style={containerStyle}>
      {renderInput()}
      <Modal
        visible={show && !disabled}
        transparent
        animationType="slide"
        supportedOrientations={["portrait", "landscape"]}
      >
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
          // @ts-ignore
          onValueChange={onItemChange}
          selectedValue={selectedItem.value}
          {...customProps}
        >
          {renderPickerItems()}
        </RNPicker>
      </Modal>
    </View>
  );
};

export default IOSPicker;
