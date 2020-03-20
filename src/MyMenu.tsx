import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { ClickParam } from 'antd/lib/menu';

interface Props {
  history: any;
}

class MyMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
        <Menu.Item key="/">
          <span>Home</span>
        </Menu.Item>
        <Menu.Item key="/adrianboimvaser/seeds">
          <span>Seeds</span>
        </Menu.Item>
      </Menu>
    );
  }

  private handleClick = (e: ClickParam) => {
    this.props.history.push(e.key);
  };
}

export default withRouter(MyMenu);
