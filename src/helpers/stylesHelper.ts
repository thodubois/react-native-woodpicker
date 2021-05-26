import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { ifIphoneX, isIOS } from "./iphone";

interface Style {
  blurTouchable: ViewStyle;
  input: ViewStyle;
  animatedInput: ViewStyle;
  placeholderStyle: TextStyle;
  doneBar: ViewStyle;
  doneButtonLabelStyle: TextStyle;
  doneColumnStyle: ViewStyle;
  iosPickerContainerStyle: ViewStyle;
  resetButtonStyle: ViewStyle;
  resetButtonContainerStyle: ViewStyle;
  placeHolderContainerStyle: ViewStyle;
  iosPickerContainer: ViewStyle;
  androidPickerContainer: ViewStyle;
  hiddenDateTimePicker: ViewStyle;
  iosPickerContainerInline: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
  blurTouchable: {
    flex: 1,
    marginTop: -50,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  animatedInput: {
    flex: 1,
    backgroundColor: "#000000",
  },
  placeholderStyle: {
    color: "black",
    fontSize: 16,
  },
  doneBar: {
    height: 44,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFF1F2",
    borderTopWidth: 0.5,
    borderTopColor: "#919498",
  },
  doneButtonLabelStyle: {
    fontSize: 20,
  },
  doneColumnStyle: {
    marginHorizontal: 8,
  },
  iosPickerContainerStyle: {
    height: ifIphoneX(255, 215),
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  resetButtonStyle: { fontSize: isIOS ? 20 : 18 },
  resetButtonContainerStyle: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  placeHolderContainerStyle: {
    position: "relative",
    flexGrow: 9,
    height: "100%",
    justifyContent: "center",
  },
  iosPickerContainer: {
    height: ifIphoneX(255, 215),
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  androidPickerContainer: {
    opacity: 0,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  hiddenDateTimePicker: {
    position: "absolute",
    opacity: 0.03,
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  iosPickerContainerInline: {
    flex: 1,
  },
});
