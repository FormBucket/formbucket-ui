/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import { IF, ISBLANK } from "formula";
import UserStore from "../stores/user";
import moment from "moment";

import { requestUsersBuckets, requestProfileById } from "../stores/webutils";

class UserReport extends React.Component {
  state = {
    submissions: undefined,
    loaded: false,
    loading: false
  };

  componentDidMount() {
    if (UserStore.isUserLoggedIn()) {
      this.setState({ loading: true });

      Promise.all([
        requestUsersBuckets(this.props.router.params.user_id),
        requestProfileById(this.props.router.params.user_id)
      ])
        .then(values =>
          this.setState({
            loading: false,
            loaded: true,
            profile: values[0],
            buckets: values[1]
          })
        )
        .catch(error => this.setState({ error: error }));
    }
  }

  render() {
    if (this.state.loaded === false) {
      return (
        <div className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      );
    }

    console.log(this.state);

    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1 colspan>User Report</h1>
          </div>
        </div>
        <div className="wrapper">
          <div>Name: {this.state.profile.name}</div>
          <div>Email: {this.state.profile.email}</div>
          <div>
            Created on:{" "}
            {moment(this.state.profile.created_on).format("MM/DD/YYYY HH:MM")}
          </div>
          <div>Total Bucket Count: {this.state.buckets.length}</div>
          <div>
            Total Submission Count:{" "}
            {this.state.buckets.reduce((p, v) => p + v.submission_count, 0)}
          </div>
          <h2>Buckets</h2>
          <table>
            {this.state.buckets.map(bucket => (
              <tr key={bucket.id}>
                <td onClick={() => this.props.select(bucket)}>
                  <FontAwesome
                    name={IF(bucket.enabled, "toggle-on", "toggle-off")}
                  />&nbsp;
                  {IF(ISBLANK(bucket.name), bucket.id, bucket.name)}
                </td>
                <td onClick={() => this.props.select(bucket)}>
                  http://api.formbucket.com/f/{bucket.id}
                  {IF(
                    bucket.email_to,
                    <span>
                      {" "}
                      <FontAwesome name="envelope-o" />
                    </span>
                  )}
                </td>
                <td>{bucket.submission_count} Submissions</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default UserReport;
