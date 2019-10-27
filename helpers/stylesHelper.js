import {StyleSheet, Platform} from 'react-native';
import ifIphoneX from './ifIphoneX';

export const styles = StyleSheet.create({
  blurTouchable: {
    flex: 1,
    marginTop: -50,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },
  animatedInput: {
    flex: 1,
    backgroundColor: '#000000',
  },
  placeholderStyle: {color: 'black', fontSize: 16},
  doneBar: {
    height: 44,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF1F2',
    borderTopWidth: 0.5,
    borderTopColor: '#919498',
  },
  doneTextStyle: {
    fontSize: 20,
  },
  doneColumnStyle: {
    marginHorizontal: 8,
  },
  iosPickerContainerStyle: {
    height: ifIphoneX(255, 215),
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  resetButtonStyle: Platform.select({
    android: {fontSize: 18},
    ios: {fontSize: 20},
  }),
  resetButtonContainerStyle: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeHolderContainerStyle: {
    flexGrow: 9,
  },
  iosPickerContainer: {
    height: ifIphoneX(255, 215),
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  androidPickerContainer: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
