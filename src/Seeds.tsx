import React from 'react';
import axios from 'axios';
import { Button, Card, Table } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import { Form, Input } from 'antd';

axios.defaults.headers.common['Authorization'] = 'Bearer 8b1fd7e9-c6e1-4e2b-b504-3330cef92f5a';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'User Id',
    dataIndex: 'userId',
    key: 'userId'
  }
];

interface Props {}

interface State {
  data: any[];
}

export default class Seeds extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount(): void {
    const self = this;
    axios
      .get('/seeds')
      .then(function(response) {
        // handle success
        console.log(response.data);
        self.setState({ data: response.data });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }

  render() {
    return (
      <>
        <Switch>
          <Route path="/seeds/new">
            <Card title="New Seed">
              <Form name="basic" initialValues={{ remember: true }}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Required!' }]}>
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Route>
          <Route path="/seeds">
            <Link to="/seeds/new">
              <Button type="primary">New Seed</Button>
            </Link>
            <Table dataSource={this.state.data} columns={columns} rowKey="id" sortDirections={['ascend', 'descend']} />
          </Route>
        </Switch>
      </>
    );
  }
}
