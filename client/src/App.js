import React, { Component } from 'react';
import Nav from './Nav';
import URLForm from './URLForm';
import URLView from './URLView';
import {Container, Grid} from 'semantic-ui-react';
import axios from 'axios';
import _ from "lodash";
import './App.css';

class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      urlCount: 1,
      urls: [],
      shortURLs: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addURL = this.addURL.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addURL(event) {
    event.preventDefault();
    if(this.state.urlCount < 10) {
      this.setState({urlCount: this.state.urlCount + 1});
    }
    else {} // TODO : make button disappear
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let requestData = [];
    let keys = [];
    for(var i=1; i<=10; i++) {
      keys.push("url"+i);
    }
    const urls = _.pick(this.state, keys);
    
    _.forOwn(urls, (value, key) => {
      requestData.push({url: value});
    });

    axios.post("/new", requestData).then((response) => {
      let shortURLs = [];
      let URLs = [];
      console.log(response);
      for(i=0; i<response.data.length; i++) {
        shortURLs.push(response.data[i].encodedURL);
        URLs.push(response.data[i].url);
      }
      console.log(shortURLs);
      this.setState({shortURLs: shortURLs});
      this.setState({URLs: URLs});
    });
  }

  render() {
    let content;
    if(this.state.shortURLs.length === 0) {
      content = <URLForm onSubmit={this.handleSubmit} addURL={this.addURL} urlCount={this.state.urlCount} handleInputChange={this.handleInputChange} />;
    } else {
      content = [];
      for(var i=0; i<this.state.shortURLs.length; i++) {
        content.push(<URLView key={"view" + i} shortURL={this.state.shortURLs[i]} url={this.state.urls[i]} />);
      }
        
    }

    return (
      <Container fluid>
        <Nav/>
        <Grid padded>
          <Grid.Row columns={3}>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column id="content">
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
