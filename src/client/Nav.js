import React, {Component} from "react";
import {Menu} from "semantic-ui-react";

class Nav extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ""
    }
  }
  
  handleItemClick = (e, {name}) => {
    this.setState({activeItem: name});
  }

  render() {
    return(
      <Menu inverted>
        <Menu.Item 
          header 
        >        
          <h1>Shortr</h1>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item 
            name="api" 
            active={this.state.activeItem === "api"} 
            onClick={this.handleItemClick}
          >
            API
          </Menu.Item>
          <Menu.Item 
            name="about" 
            active={this.state.activeItem === "about"} 
            onClick={this.handleItemClick}
          >
            About
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }

}

export default Nav;
