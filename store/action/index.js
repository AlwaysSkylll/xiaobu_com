import TYPES from './actionTypes'

export default function windowResize(payload) {
  return { type: TYPES.WINDOW_RESIZE, payload }
}
