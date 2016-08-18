import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

var content = require('../content/about.md');

// about Documentation
const about = React.createClass({
  componentDidMount() {
    // ensure user is scrolled to top
    window.scrollTo(0, 0)
  },
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>About us</h1>
          </div>
        </div>
        <div className="wrapper">
          <Markdown
            source={ content }
            options={ markdownOptions }
            />
        </div>
      </div>
    )
  }
})

export default about