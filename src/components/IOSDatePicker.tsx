import React from "react";
import {
  View,
  Modal,
  Animated,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../helpers/stylesHelper";
import { IOSDisplay, Mode } from "../types/datepicker";

export type Props = {
  value: Date;
  show: boolean;
  mode?: Mode;
  disabled?: boolean;
  animationValue: Animated.Value;
  renderInput: (
    renderHiddenCompactIOSPicker?: () => JSX.Element
  ) => JSX.Element;
  renderDoneBar: () => JSX.Element;
  togglePicker: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
  locale?: string;
  timeZoneOffsetInMinutes?: number;
  textColor?: string;
  onChange: (_: any, newDate?: Date | undefined) => void;
  display?: IOSDisplay;
  iosCompactHiddenStyle?: ViewStyle;
};

const IOSDatePicker = ({
  show,
  disabled,
  animationValue,
  display,
  renderInput,
  renderDoneBar,
  togglePicker,
  containerStyle,
  iosCompactHiddenStyle,
  ...pickerProps
}: Props): JSX.Element => {
  if (Number(Platform.Version) >= 14 && display === "compact") {
    return renderInput(() => (
      <DateTimePicker
        style={[styles.hiddenDateTimePicker, iosCompactHiddenStyle]}
        disabled={disabled}
        {...pickerProps}
      />
    ));
  }
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
        <View
          style={[
            styles.iosPickerContainerStyle,
            display === "inline" ? styles.iosPickerContainerInline : null,
          ]}
        >
          <DateTimePicker
            disabled={disabled}
            display={display}
            {...pickerProps}
          />
        </View>
      </Modal>
    </View>
  );
};

export default IOSDatePicker;
