import type { TextStyle, ViewStyle } from "react-native";
import type { InputProps, DoneBarProps, BackdropAnimationType } from "../types";

export type PickerItem = {
  value: any;
  label: string;
  color?: string;
};

export type PickerProps = {
  item?: PickerItem;
  items: Array<PickerItem>;
  disabled?: boolean;
  placeholder?: string;
  title?: string;
  doneButtonLabel?: string;
  isNullable?: boolean;
  onItemChange: (item: PickerItem, index: number) => void;
  onOpen?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  textInputStyle?: TextStyle;
  touchableStyle?: ViewStyle;
  InputComponent?: React.ElementType<InputProps>;
  DoneBarComponent?: React.ElementType<DoneBarProps>;
  backdropAnimation?: BackdropAnimationType;
  mode?: "dialog" | "dropdown";
  androidCustomProps?: { [key: string]: any };
  iosCustomProps?: { [key: string]: any };
};
