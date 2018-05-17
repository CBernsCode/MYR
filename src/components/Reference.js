import React from 'react';
import myrReference from '../myr/reference';
import Highlight from 'react-highlight.js';
import { Tabs, Tab, Button, Drawer, Icon } from 'material-ui';
// import MenuItem from 'material-ui/MenuItem';


import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from 'material-ui';

export default class Reference extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 'a',
    };
    this.tableData = myrReference();
  }

  handleToggle = () => this.setState({ open: !this.state.open, value: 'a' });

  handleChange = (event, value) => {
    this.setState({ value });
  };

  TableEx = (category) => {

    return (
      <Table  >
        <TableHead >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Parameters</TableCell>
            <TableCell>Return Value</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  >
          {this.tableData[category].map((row, index) => (
            <TableRow key={index}>
              <TableCell >{row.name}</TableCell>
              <TableCell  >
              <div>
                <Highlight language={'javascript'} >
                  {row.parameters}
                </Highlight>
                </div>
              </TableCell>
              <TableCell >{row.returnValue}</TableCell>
              <TableCell >{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  render() {

    return (
      <div>
        <Button
          variant="raised"
          color="primary"
          fullWidth
          className="d-none d-md-block"
          onClick={() => this.setState({ open: true })}>
          <Icon className="material-icons md-36">description</Icon> Reference
        </Button>
        <Drawer
          id="reference-drawer"
          variant="persistent"
          open={this.state.open}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange} >
            <Tab
              icon={<Icon className="material-icons">change_history</Icon>}
              label="Geometry"
              value='a'>
            </Tab>
            <Tab
              icon={<Icon className="material-icons">build</Icon>}
              label="TRANSFORMATIONS"
              value='b' />
            <Tab
              icon={<Icon className="material-icons">settings</Icon>}
              label="WEBVR COMPONENTS"
              value='c' />
            <Tab
              icon={<Icon className="material-icons">close</Icon>}
              label="CLOSE"
              value='x'
              onClick={this.handleToggle} />
          </Tabs>
          {this.state.value === 'a' &&
            <div style={{marginTop: 25}}>
              <h5 >Geometry</h5>
              {this.TableEx("geometry")}
            </div>}
          {this.state.value === 'b' &&
            <div>
              <h5 >Transformations</h5>
              {this.TableEx("transformations")}
            </div>}
          {this.state.value === 'c' &&
            <div>
              <h5 >WebVR Components</h5>
              {this.TableEx("webvr_components")}
            </div>}
        </Drawer>
      </div>
    );
  }
}