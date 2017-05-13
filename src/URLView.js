import React, { Component } from 'react';
import {Item} from 'semantic-ui-react';

class URLView extends Component {
  render() {
    return (
      <Item.Group divided>
        <Item>
          <Item.Image size="tiny" src={this.props.screenshotURL} />
          <Item.Content verticalAlign="middle">{this.props.shortURL}</Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default URLView;