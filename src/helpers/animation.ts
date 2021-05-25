import type { BackdropAnimationType } from "../types";

import { DEFAULT_BACKDROP_ANIMATION } from "../constants/animation";

export function getAnimatedProperties(
  backdropAnimation?: BackdropAnimationType
): BackdropAnimationType {
  return {
    ...DEFAULT_BACKDROP_ANIMATION,
    ...(backdropAnimation || {}),
  };
}
