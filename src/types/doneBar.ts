import type { GestureResponderEvent } from "react-native";
export type DoneBarProps = {
  title?: string;
  doneButtonLabel?: string;
  onDonePress: (event: GestureResponderEvent) => void;
};
