/**
* Copyright (c) 2015, Peter W Moresi
*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';

import ActionCreator, {initUser} from '../stores/ActionCreator'

// FIXME: Dev HACK
window.ActionCreator = ActionCreator

/* Write some great components about what data
* this application displays and how it needs to be
* organized.
*/
const App = React.createClass({

  componentDidMount: function() {
    initUser()
  },

  render() {
    return (
      <div>
        <Header />
        <div className="main">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
});

export default App
