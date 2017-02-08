var FontAwesome = require('react-fontawesome');
import React, { PropTypes } from 'react'

const CreditCardForm = React.createClass({

  getInitialState() {
    return {
      number: this.props.number,
      exp: this.props.exp_month + '/' + this.props.exp_year,
    }
  },

  handleKeyUp (event) {
    if (event.keyCode === 13) {
      this.props.onSubmit(event)
    }
  },

  render () {
    return (
      <div className="payment-info">
        <div className="payment-meta">
          <div className="security-info">
            <p><FontAwesome name='lock' /> All transactions are secure and encrypted.</p>
          </div>
          <img className="stripe-badge" src="/img/stripe.svg" />
        </div>
        <div className="card-details">
          <div className="cardNumber">
            <label htmlFor="cardNumber">Card Number</label>
            <input value={this.state.number}
            onChange={(e) => this.setState({ number: e.target.value })}
            onFocus={(e) => e.target.value === this.props.number ? this.setState({ number: '', exp: ''}) : null }
            onBlur={(e) => this.setState({ number: e.target.value === '' ? this.props.number : e.target.value, exp: e.target.value === '' ? this.props.exp : this.state.exp })}
            name="number" onKeyUp={this.handleKeyUp} type="text" ref="cardNumber" data-stripe="number"/>
          </div>
          <div className="exp">
            <label htmlFor="exp">Exp</label>
            <input name="expiry" value={this.state.exp}
            onChange={(e) => this.setState({ exp: e.target.value })}
            onBlur={(e) => this.setState({ exp: e.target.value === '' ? this.props.exp : e.target.value  })}
            type="text" ref="exp" maxLength="7" data-stripe="exp" placeholder="MM/YYYY"/>
          </div>
          <div className="cvc">
            <label htmlFor="cvc">CVC</label>
            <input name="csv" maxLength="4" onKeyUp={this.handleKeyUp} type="text" ref="cvc" data-stripe="cvc"/>
          </div>
        </div>
      </div>
    )
  }
})

export default CreditCardForm
