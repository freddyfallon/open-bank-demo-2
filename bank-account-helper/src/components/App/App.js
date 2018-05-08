import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import queryString from 'query-string';
import CostDisplay from '../CostDisplay/CostDisplay';
import { requestToken } from '../../actions/getTokenAction';
import './App.css';

class App extends Component {
  componentDidMount() {
    if (!this.props.token && this.props.location.search) {
      const { code } = queryString.parse(this.props.location.search);
      if (code) {
        this.props.requestToken(code);
      }
    }
  }

  render() {
    if (!this.props.token) {
      return (
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <PageHeader>Login with open banking</PageHeader>
            </Col>
          </Row>
          <Row>
            <p className="help-text">So that we can make things easier for you when using this site, please authorise TrueLayer below.</p>
            <p className="help-text">This will give us access to the details of your bank accounts, which means that you will spend less time filling out forms on our site, or looking up information from previous bills and bank statements.</p>
          </Row>
          <Row md={8}>
            <div className="primary-btn-container">
              <Button bsStyle="primary" bsSize="large" href={process.env.REACT_APP_BANK_ROBBER_URL}>
                Authorise Open Banking
              </Button>
            </div>
          </Row>
        </Grid>
      );
    }
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <PageHeader>We think we have worked out how much you're currently paying</PageHeader>
          </Col>
          <Col xs={12} md={12}>
            <CostDisplay />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  requestToken: value => dispatch(requestToken(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
