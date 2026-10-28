export const GLOBE_CONFIG = {
  DURATION: 0.95,
  EASING: [0.33, 1, 0.68, 1],
  SCALE_DIP: 0.86,
  BACKGROUND: '#1A110B',
}
export const MOBILE_GLOBE_CONFIG = GLOBE_CONFIG

export {
  PageTransition,
  PageTransition as TiltProvider,
  PageTransition as GlobeProvider,
  usePageTransitionNavigate,
  useTiltNavigate,
  useGlobeNavigate,
  getGlobeTurnDirection,
} from './PageTransition'

export { default } from './PageTransition'