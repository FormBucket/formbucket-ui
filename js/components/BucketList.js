import {branch, eq, isBlank} from 'functionfoundry'
import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

const Buckets = React.createClass({
  render () {
    if (isBlank(this.props.buckets)) {
      return (
        <div>Loading Buckets...</div>
      )
    }

    if (eq(this.props.buckets.length, 0)) {
      return (
        <div>You have no buckets. There was never a better time to make one! Get started now.</div>
      )
    }

    return (
      <ul className="bucket-list">
          {
            this.props.buckets.map(bucket => (
              <li key={bucket.id} >
                <div className="bucket-item">
                  <p onClick={() => this.props.select(bucket)}>
                    <FontAwesome className="toggle-switch" name={branch(bucket.enabled, 'toggle-on', 'toggle-off')} />
                    <span>
                      { branch( isBlank(bucket.name), bucket.id, bucket.name ) }
                    </span>
                  </p>
                  <div className="submission-count">
                    <button className="secondary" onClick={ () => this.props.show(bucket) }>{bucket.submission_count} Submissions <FontAwesome name='chevron-right' /></button>
                  </div>
                </div>
              </li>
            ))
          }
      </ul>
    )
  }
})

export default Buckets