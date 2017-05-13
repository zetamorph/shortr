import React, { Component } from 'react';
import Nav from './Nav';
import URLForm from './URLForm';
import URLView from './URLView';
import {Container, Grid} from 'semantic-ui-react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      urlCount: 1,
      url: "",
      shortURL: "",
      screenshotURL: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const urlData = event.target.url.value;
    this.setState({url: urlData});
    let self = this;
    axios.post("/new", {url: urlData}).then((response) => {
      self.setState({shortURL: response.data.shortURL, screenshotURL: response.data.screenshotURL});
    });
  }

  render() {
    let content;
    if(!this.state.shortURL) {
      content = <URLForm onSubmit={this.handleSubmit} />;
    } else {
      content = <URLView shortURL={this.state.shortURL} url={this.state.url} screenshotURL={this.state.screenshotURL} />;
    }

    return (
      <Container fluid>
        <Nav/>
        <Grid padded>
          <Grid.Row columns={3}>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column inverted>
              {content}
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
