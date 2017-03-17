import React from 'react';
import Form from 'react-formal';
import { connect } from 'react-redux'

import * as actions from './actions';

const EMPTY = {};

export default function createForm({ formKey, ...initialProps }) {
  function mapStateToProps({ form }) {
    return form[formKey] || EMPTY;
  }

  const connector = connect(mapStateToProps, actions);

  class ReduxForm extends React.Component {
    static propTypes = {
      mapValue: React.PropTypes.func,
      mapErrors: React.PropTypes.func,
    }

    componentDidMount() {
      if (!this.props.initialized) {
        const { onInit } = this.props;

        this.props.onInit(formKey, initialProps);
      }
    }

    handleChange = (value, paths) => {
      const { mapValue = v => v, onChange } = this.props;

      onChange(formKey, mapValue(value, paths), paths);
    }

    handleError = (errors) => {
      const { mapErrors = v => v, onError } = this.props;

      onError(formKey, mapErrors(errors));
    }

    render() {
      const { initialized, props, children, onSubmit } = this.props;

      if (!initialized) return null;

      delete props.onInit;
      delete props.mapErrors;
      delete props.mapValue;

      return (
        <Form
          {...props}
          formKey={formKey}
          onSubmit={onSubmit}
          onChange={this.handleChange}
          onError={this.handleError}
        >
          {children}
        </Form>
      )
    }
  }

  return connector(ReduxForm);
}
