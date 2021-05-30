import React from 'react';
import { Redirect } from 'react-router';

export class NotFound extends React.Component {

  render() {
    return <Redirect to="/"></Redirect>;
  }

}

