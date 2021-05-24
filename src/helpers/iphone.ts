import { Dimensions, Platform } from "react-native";

export const ifIphoneX = (
  iphoneXStyle: string | number,
  regularStyle: string | number
): string | number => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

export const isIphoneX = (): boolean => {
  const dimen: { height: number; width: number } = Dimensions.get("window");

  const hasDimen1: boolean = dimen.height === 812 || dimen.width === 812;
  const hasDimen2: boolean = dimen.height === 896 || dimen.width === 896;

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (hasDimen1 || hasDimen2)
  );
};

export const isIOS: boolean = Platform.OS === "ios";
