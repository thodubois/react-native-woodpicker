import type { DatePickerProps, InputProps, DoneBarProps } from "../types";

import React, { useState, useRef, useMemo } from "react";
import { Animated, Platform } from "react-native";
import DefaultInputButton from "./InputButton";
import DefaultDoneBar from "./DoneBar";
import IOSDatePicker from "./IOSDatePicker";
import AndroidDatePicker from "./AndroidDatePicker";
import { isIOS } from "../helpers/iphone";
import { DEFAULT_BACKDROP_ANIMATION } from "../constants/animation";
import { getAnimatedProperties } from "../helpers/animation";

const DatePicker = ({
  value,
  onDateChange,
  text = "",
  isNullable = false,
  title = "",
  doneButtonLabel = "",
  onOpen = () => null,
  onClose = () => null,
  disabled = false,
  iosDisplay = "spinner",
  androidDisplay = "spinner",
  iosMode = "date",
  androidMode = "date",
  InputComponent,
  DoneBarComponent,
  backdropAnimation = DEFAULT_BACKDROP_ANIMATION,
  style,
  containerStyle,
  textInputStyle,
  touchableStyle,
  iosCompactHiddenStyle,
  androidCustomProps,
  iosCustomProps,
  ...pickerProps
}: DatePickerProps): JSX.Element => {
  const [pickedDate, setPickedDate] = useState<Date>(value || new Date());
  const [show, setShow] = useState<boolean>(false);
  const fadeAnimationValue = useRef(new Animated.Value(0)).current;

  const animationProperties = useMemo(
    () => getAnimatedProperties(backdropAnimation),
    [backdropAnimation]
  );

  const handleiOSDateChange = (_: any, newDate?: Date) => {
    if (newDate) setPickedDate(newDate);
    if (iosDisplay === "compact") onDateChange(newDate);
  };

  const handleAndroidDateChange = (_: any, newDate?: Date) => {
    togglePicker();
    if (newDate !== undefined) {
      setPickedDate(newDate);
      onDateChange && onDateChange(newDate);
    }
  };

  const resetValue = () => onDateChange && onDateChange();

  const toggle = () => {
    setShow(!show);
    show ? onOpen?.() : onClose?.();
  };

  const togglePicker = () => {
    if (disabled) {
      return;
    }

    // No animation needed for Android
    if (!isIOS) {
      toggle();
      return;
    }

    if (!show) {
      toggle();
    }

    Animated.timing(fadeAnimationValue, {
      toValue: !show ? animationProperties.opactiy : 0,
      duration: !show ? animationProperties.duration : 0,
      delay: !show ? animationProperties.delay : 0,
      useNativeDriver: true,
    }).start(show ? toggle : undefined);

    setPickedDate(show && value ? value : pickedDate);
  };

  const onDonePress = () => {
    togglePicker();
    onDateChange(pickedDate);
  };

  const renderInputButton = (
    renderHiddenCompactIOSPicker: () => JSX.Element | null = () => null
  ) => {
    const inputProps: InputProps = {
      resetValue,
      togglePicker,
      style,
      text,
      textInputStyle,
      touchableStyle,
      isNullable,
      isCompactHiddenPickerNeeded:
        isIOS && Number(Platform.Version) >= 14 && iosDisplay === "compact",
      renderHiddenCompactIOSPicker,
    };
    const RenderComponent: React.ElementType<InputProps> = InputComponent
      ? InputComponent
      : DefaultInputButton;
    return <RenderComponent {...inputProps} />;
  };

  const renderDoneBarButton = () => {
    const barProps: DoneBarProps = {
      title,
      doneButtonLabel,
      onDonePress,
    };
    const RenderComponent = DoneBarComponent
      ? DoneBarComponent
      : DefaultDoneBar;
    return <RenderComponent {...barProps} />;
  };

  const {
    locale,
    timeZoneOffsetInMinutes,
    textColor,
    neutralButtonLabel,
    ...commonProps
  } = pickerProps;

  const datePickerProps = {
    show,
    disabled,
    animationValue: fadeAnimationValue,
    value: pickedDate,
    togglePicker,
    renderInput: renderInputButton,
    renderDoneBar: renderDoneBarButton,
    containerStyle: containerStyle,
    ...commonProps,
  };

  if (isIOS) {
    return (
      <IOSDatePicker
        display={iosDisplay}
        mode={iosMode}
        locale={locale}
        timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
        textColor={textColor}
        onChange={handleiOSDateChange}
        iosCompactHiddenStyle={iosCompactHiddenStyle}
        {...datePickerProps}
        {...iosCustomProps}
      />
    );
  }

  return (
    <AndroidDatePicker
      display={androidDisplay}
      mode={androidMode}
      neutralButtonLabel={neutralButtonLabel}
      onChange={handleAndroidDateChange}
      {...datePickerProps}
      {...androidCustomProps}
    />
  );
};

export default DatePicker;
