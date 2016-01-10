import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'

const AccountBilling = React.createClass({
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Integrations</h1>
          </div>
        </div>
        <div className="page-nav-container">
          <div className="wrapper">
            <ul className="page-nav">
              <li><Link to="/account">Profile</Link></li>
              <li><Link to="/account/users">Users</Link></li>
              <li className="active">Integrations</li>
              <li><Link to="/account/billing">Billing</Link></li>
            </ul>
          </div>
        </div>
        <div className="wrapper">
          <div className="half-width">
            <form method="post" action="">
              <label for="orgName">Company/Organization Name</label>
              <input type="text" refs="orgName" name="orgName" value="FunctionFoundry" placeholder="e.g. Tesla Electric Co."/>
              <button className="button secondary" type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
})

export default AccountBilling
