import React, { Component } from 'react';
import {Item, Input, Button} from 'semantic-ui-react';

class URLView extends Component {
  render() {
    return (
      <Item.Group divided>
        <Item>
          <Item.Image size="tiny" src={this.props.screenshotURL} />
          <Item.Content verticalAlign="middle">
            <Input value="http://shortr.loewe.pm{this.props.shortURL}"></Input>
            <Button color="teal" icon="copy">Copy</Button>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default URLView;