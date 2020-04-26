import React from 'react';
import { render } from 'react-dom';

import Main from './components/Main';

require('style-loader!css-loader!sass-loader!./styles/app.scss');

render(
  <Main />
  , document.getElementById('calculation-app'));
