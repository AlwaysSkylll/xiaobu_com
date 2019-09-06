
import TYPES from '../action/actionTypes'

const initialState = {
  clientHeight: 0,
  clientWidth: 0,
  wow: null,
  darkNav: false,
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.WINDOW_RESIZE:
      return Object.assign({}, state, {
        clientHeight: payload.clientHeight,
        clientWidth: payload.clientWidth,
      })
    case TYPES.SET_WOW:
      return Object.assign({}, state, {
        wow: payload
      })
    case TYPES.SET_NAV_THEME:
      return Object.assign({}, state, {
        darkNav: payload.darkNav
      })
    default:
      return state
  }
}

