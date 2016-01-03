import React, { PropTypes } from 'react'
import {COND, NOT, EQ, ISBLANK} from 'functionfoundry'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {loadBucket, loadSubmissionsByBucket} from '../stores/ActionCreator'
import SubmissionsStore from '../stores/Submissions'

const Submissions = React.createClass({
  getInitialState () {
    return {
      mode: 'json',
      submissions: undefined,
      loaded: false
    }
  },
  componentDidMount() {
    if (UserStore.isUserLoggedIn()) {
      this.token = SubmissionsStore.addListener(this.handleSubmissionsChanged)

      var bucket = BucketStore.find(this.props.params.id)

      if (bucket) {

        console.log('found', bucket)
        this.setState( { bucket: bucket } )
        loadSubmissionsByBucket(this.props.params.id, 0, 50)

        var submissions = SubmissionsStore.getSubmissionsByBucket(this.props.params.id)

        if (submissions && submissions.length > 0) {
          this.setState({ loaded: true, submissions: submissions })
          return
        }

        loadSubmissionsByBucket(this.props.params.id, 0, 50)
        return

      }


      console.log('load bucket and submissions for', this.props.params.id)
      loadBucket(this.props.params.id, (err, bucket) => {
        if (err) {
          alert('Error loading...')
          this.setState( { error: err } )

        }
        this.setState( { bucket: bucket } )
        loadSubmissionsByBucket(this.props.params.id, 0, 50)
      })
    }
  },
  componentWillUnmount() {
    if (this.token) {
      this.token.remove()
    }
  },
  handleSubmissionsChanged: function() {
    console.log('handleSubmissionsChanged', this.props.params.id, SubmissionsStore.getState())
    this.setState({
      loaded: true,
      submissions: COND(
        ISBLANK(this.props.params.id),
        [],
        SubmissionsStore.getSubmissionsByBucket(this.props.params.id)
      )
    })
  },
  render () {

    if (EQ(this.state.loaded, false)) {
      return (
        <div>Loading...</div>
      )
    }

    if (ISBLANK(this.props.params.id)) {
      return (
        <div>ERROR: No bucket selected!</div>
      )
    }

    if (ISBLANK(this.state.bucket)) {
      return (
        <div>ERROR: Cannot find bucket!</div>
      )
    }

    if (ISBLANK(this.state.submissions)) {
      return (
        <div>Loading...</div>
      )
    }

    if (EQ(this.state.submissions.length, 0)) {
      return (
        <div>No Submissions Yet!</div>
      )
    }

    if (EQ(this.state.mode, 'list')) {
      return (
        <div>Do the list mode</div>
      )
    }

    if (EQ(this.state.mode, 'table')) {
      return (
        <div>Do the table mode</div>
      )
    }

    if (EQ(this.state.mode, 'json')) {
      return (
        <div>
          <div className="page-heading">
            <div className="wrapper">
              <h1>Submissions</h1>
            </div>
          </div>
          <div className="wrapper">
            <table className="bucket-list">
              <thead>
                <tr>
                  <th>
                    { this.state.bucket.name }
                    <span style={{float:'right'}}>
                      Export: &nbsp;
                      <a href="#">CSV</a> { ' | ' }
                      <a href="#">JSON</a>&nbsp;&nbsp;&nbsp;&nbsp;

                      Format: &nbsp;
                      <a href="#">List</a> { ' | ' }
                      <a href="#">Table</a>{ ' | ' }
                      <a href="#">JSON</a>&nbsp;&nbsp;&nbsp;&nbsp;

                      {1}-{50} of {107}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.submissions.map( (submission, i) => (
                  <tr key={i} style={{marginBottom: 10, borderBottom: '1px solid black' }}>
                    <td>
                      <Markdown
                        source={ '```JSON\n' + JSON.stringify(submission, null, 4) + '\n```' }
                        options={ markdownOptions }>
                      </Markdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    return (
      <div>Huh, unsupported mode.</div>
    )
  }
})

export default Submissions
