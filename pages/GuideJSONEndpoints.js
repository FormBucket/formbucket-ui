import { h } from "preact";
import { connect } from "unistore/preact";
import GuideJSONEndpoints from "../components/GuideJSONEndpoints";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "error,menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideJSONEndpoints />
  </Layout>
));
export default Page;
