import updateIn from 'topeka/updateIn';

import * as CONSTANTS from './constants'

export default function formReducer(state = {}, action) {
  const { formKey } = action.meta || {};

  if (!formKey) return state;

  switch (action.type) {
    case CONSTANTS.INIT: {
      state = updateIn(state, `["${formKey}"]`, {
        props: action.payload,
        initialized: true,
      })
      break;
    }
    case CONSTANTS.CHANGE:
      state = updateIn(state, `["${formKey}"].props.value`, action.payload)
      break;
    case CONSTANTS.ERROR:
      state = updateIn(state, `["${formKey}"].props.errors`, action.payload)
      break;
    default:
  }

  return state;
}
