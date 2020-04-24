import React from 'react';
import { render } from 'react-dom';

import Main from './components/Main';

require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
require('style-loader!css-loader!sass-loader!./styles/app.scss');
$(document).foundation();

render(
  <Main />
  , document.getElementById('app'));
