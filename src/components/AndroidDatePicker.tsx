import React from "react";
import { View, ViewStyle } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Display, Mode } from "../types/datepicker";

export type Props = {
  value: Date;
  show: boolean;
  mode?: Mode;
  disabled?: boolean;
  display?: Display;
  renderInput: () => JSX.Element;
  containerStyle?: ViewStyle | undefined;
  neutralButtonLabel?: string;
  onChange: (_: any, newDate?: Date | undefined) => void;
};

const AndroidDatePicker = ({
  show,
  disabled,
  renderInput,
  containerStyle,
  ...pickerProps
}: Props): JSX.Element => {
  return (
    <>
      <View style={containerStyle}>{renderInput()}</View>
      {show && !disabled ? <DateTimePicker {...pickerProps} /> : null}
    </>
  );
};

export default AndroidDatePicker;
