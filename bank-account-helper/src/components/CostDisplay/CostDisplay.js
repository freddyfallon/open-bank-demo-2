import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import './CostDisplay.css';

import { requestTransaction } from '../../actions/getTransaction';


class CostDisplay extends Component {
  componentDidMount() {
    this.props.requestTransaction(this.props.token);
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col xs={12} md={12}>
            <p className="">It looks like you are paying {this.props.transaction.description} £{this.props.transaction.amount} per month.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <p>Is that correct?</p>
          </Col>
          <Col xs={12} md={12}>
            <div className="btn-container">
              <Button bsStyle="success" bsSize="large">
              Yes!
              </Button>
              <Button bsStyle="danger" bsSize="large">
              Nope!
              </Button>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  transaction: state.transactions.transaction,
});

const mapDispatchToProps = dispatch => ({
  requestTransaction: value => dispatch(requestTransaction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CostDisplay);
