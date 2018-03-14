import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { red500 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

// tslint:disable-next-line:function-name
export default function ErrorIcon() {
  return (
    <FontIcon className="material-icons" color={red500}>
      error
    </FontIcon>
  );
}
