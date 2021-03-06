/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";

let Compare = class extends Component {
  render() {
    return (
      <div>
        <div class="wrapper">
          <h2>
            <a id="How_do_they_stack_up_0" />How do they compare?
          </h2>
          <p>
            <a href="https://www.formbucket.com">FormBucket</a> is a great
            low-cost{" "}
            <strong>
              alternative to <a href="https://www.formkeep.com">FormKeep</a>
            </strong>. We are probably a little bit biased here, but we think
            you"ll agree after comparing features and pricing that FormBucket
            gets the job done for a lot less :)
          </p>
          <table>
            <thead>
              <tr>
                <th />
                <th>FormBucket</th>
                <th>FormKeep</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price per mo.</td>
                <td style={{ color: "green" }}>$7</td>
                <td style={{ color: "red" }}>$59-$199*</td>
              </tr>
              <tr>
                <td># of Forms</td>
                <td style={{ color: "green" }}>Unlimited</td>
                <td style={{ color: "red" }}>4-75</td>
              </tr>
              <tr>
                <td># of Submissions</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Hosted Endpoints</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Submission Dashboard</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>URL Redirects</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>AJAX Support</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Realtime Notifications</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Spam Protection</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Custom Autoresponders</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Webhooks</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Zapier Integration</td>
                <td style={{ color: "red" }}>No</td>
                <td style={{ color: "green" }}>Yes</td>
              </tr>
              <tr>
                <td>SSL Encryption</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
          <div class="callout">
            <div class="signup">
              <a href="/signup" class="button">
                Get Started with FormBucket
              </a>
            </div>
          </div>
          <p>
            Note: We greatly admire the talented folks at thoughtbot who run
            FormKeep (we even use their fantastic open source{" "}
            <a href="https://github.com/thoughtbot/bourbon">Bourbon</a> library
            in FormBucket)!
          </p>
          <p>*Pricing data as published 2/24/17 on FormKeep.com.</p>
        </div>
      </div>
    );
  }
};

export default Compare;
