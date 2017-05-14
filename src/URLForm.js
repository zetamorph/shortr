import React, { Component } from 'react';
import {Button, Form, Input} from 'semantic-ui-react';

class URLForm extends Component {

  render() {

    let inputs = [];
    for(var i=1; i<= this.props.urlCount; i++) {
      inputs.push(<Input type="text" name={"url" + i} key={"input" + i} placeholder="Enter a URL" onChange={this.props.handleInputChange} />);
    }

    return(
      <Form onSubmit={this.props.onSubmit}>
        {inputs}
        <Button circular icon="plus" color="green" onClick={this.props.addURL}></Button>
        <Button color="teal" icon="compress" type="submit" content="Shorten" labelPosition="right" />
        
      </Form>
    );
  }
}

export default URLForm;