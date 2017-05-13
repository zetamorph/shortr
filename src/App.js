import React, { Component } from 'react';
import URLForm from './URLForm';
import URLView from './URLView';
import {Container, Header} from 'semantic-ui-react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      URL: "",
      shortURL: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const urlData = event.target.url.value;
    this.setState({URL: urlData});
    let self = this;
    axios.post("http://localhost:9000/new", {url: urlData}).then((response) => {
      self.setState({shortURL: response.data.shortURL}, function afterURLReceived() {

      });
    });
  }

  render() {
    let content;
    if(!this.state.shortURL) {
      content = <URLForm onSubmit={this.handleSubmit} />;
    } else {
      content = <URLView shortURL={this.state.shortURL} url={this.state.URL} />;
    }

    return (
      <Container>
        <Header>Shortr</Header>
        {content}
      </Container>
    );
  }
}

export default App;
