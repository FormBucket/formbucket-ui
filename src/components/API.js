import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

var content = require('../content/api.md');

// api Documentation
const api = React.createClass({
  componentDidMount() {
    // ensure user is scrolled to top
    window.scrollTo(0, 0)
  },
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>API</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="two-thirds">
            <Markdown
              source={ content }
              options={ markdownOptions }
              />
          </div>
        </div>
      </div>
    )
  }
})

export default api
