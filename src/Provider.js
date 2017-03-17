import React from 'react';
import Form from 'react-formal'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

const reducers = {
  form: require('./reducer').default
}


class Provider extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.store = createStore(combineReducers(reducers))
  }
  render() {
    return (
      <ReduxProvider store={this.store}>
        <Form.Context>
          {this.props.children}
        </Form.Context>
      </ReduxProvider>
    )
  }
}

export default Provider
