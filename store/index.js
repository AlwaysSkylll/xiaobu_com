import { createStore } from 'redux'
// import { WINDOW_RESIZE } from './action/actionTypes'
import action from './action'
import reducer from './reducer'

const store = createStore(reducer);

export default store
