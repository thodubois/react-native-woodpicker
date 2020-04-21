import {Dimensions, Platform} from 'react-native';

export default function isIphoneX() {
  const dimen = Dimensions.get('window');

  const hasDimen1 = dimen.height === 812 || dimen.width === 812;
  const hasDimen2 = dimen.height === 896 || dimen.width === 896;

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (hasDimen1 || hasDimen2)
  );
}
