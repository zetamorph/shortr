import React, { Component } from 'react';
import {Button, Form, Input} from 'semantic-ui-react';

class URLForm extends Component {
  render() {
    return(
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group>
          <Input 
            type="text" 
            name="url" 
            placeholder="Enter a URL"
          />
          <Button color="teal" icon="compress" type="submit" content="Shorten" labelPosition="right" />
        </Form.Group>
        
      </Form>
    );
  }
}

export default URLForm;