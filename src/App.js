import React from 'react';

import 'react-widgets/dist/css/react-widgets.css';

import Form from 'react-formal';
import Provider from './Provider';
import createForm from './Form';
import { object, array, string, number } from 'yup';

css`
  .app {
    color: red;
  }
`;

Form.addInputTypes(require('react-formal-inputs'))

const schema = object({
  first: string().required(),
  last: string().required(),
  address: string().required(),
});

const ContactForm = createForm({
  schema,
  formKey: 'ContactForm',
  value: schema.default(),
})

class App extends React.Component {
  state = { toggleNames: true };

  handleSubmit = (...args) => {
    console.log(...args)
  }

  handleToggle = () => {
    this.setState({ toggleNames: !this.state.toggleNames })
  }

  render() {
    return (
      <Provider>
        <div className="app">
          <button onClick={this.handleToggle}>
            Toggle Name fields
          </button>
          <br />
          {this.state.toggleNames && (
            <ContactForm>
              <Form.Field name='first' placeholder="first name" />
              <Form.Message for='first' />
            </ContactForm>
          )}
          {!this.state.toggleNames && (
            <ContactForm>
              <Form.Field name='last' placeholder="last name" />
              <Form.Message for='last' />
            </ContactForm>
          )}
          <br />
          <ContactForm>
            <Form.Field name='address' type="textarea" placeholder="address"/>
            <Form.Message for='address' />

            <Form.Summary />
          </ContactForm>

          <Form.Button formKey="ContactForm" type="submit">
            Submit
          </Form.Button>
        </div>
      </Provider>
    );
  }
}

export default App;
