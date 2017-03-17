import * as CONSTANTS from './constants'

export const onInit = (formKey, props) => ({
  type: CONSTANTS.INIT,
  meta: { formKey },
  payload: props,
})

export const onChange = (formKey, value, paths, event) => ({
  type: CONSTANTS.CHANGE,
  meta: { formKey, paths, event },
  payload: value,
})

export const onError = (formKey, errors,  event) => ({
  type: CONSTANTS.ERROR,
  meta: { formKey, event },
  payload: errors,
})
