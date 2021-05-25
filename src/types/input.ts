import type { ViewStyle, TextStyle, GestureResponderEvent } from "react-native";

export type InputProps = {
  resetValue?: () => void;
  togglePicker: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  text?: string;
  textInputStyle?: TextStyle;
  isNullable?: boolean;
  isCompactHiddenPickerNeeded?: boolean;
  renderHiddenCompactIOSPicker: () => JSX.Element | null;
};
