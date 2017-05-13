import React, { Component } from 'react';
import {Item} from 'semantic-ui-react';

class URLView extends Component {
  render() {
    return (
      <Item.Group divided>
        <Item>
          <Item.Image size="tiny" src="http://api.screenshotlayer.com/api/capture?access_key=eafbc5afc34f0b425a5509ed426a42b8&url=http://google.com&viewport=1440x900&width=250" />
          <Item.Content verticalAlign="middle">{this.props.shortURL}</Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default URLView;