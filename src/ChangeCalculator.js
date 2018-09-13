import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Row,
  Col,
  Grid
} from "react-bootstrap";

class ChangeCalculator extends Component {
  constructor() {
    super();
    this.state = { value: "", change: [] };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const regx = /^\d*(\.\d{0,2})?$/;
    if (e.target.value === "" || regx.test(e.target.value)) {
      this.setState({ value: e.target.value });
      this.calChange(e.target.value);
    }
  }

  getUnit(value, total) {
    let unit = "";
    switch (value) {
      case 100:
      case 50:
      case 20:
      case 10:
      case 5:
      case 1:
        unit = `${value} dollar ${total > 1 ? "bills" : "bill"}`;
        break;
      case 0.25:
        unit = total > 1 ? "quarters" : "quarter";
        break;
      case 0.1:
        unit = total > 1 ? "dimes" : "dime";
        break;
      case 0.05:
        unit = total > 1 ? "nickels" : "nickel";
        break;
      case 0.01:
        unit = total > 1 ? "pennies" : "penny";
        break;
      default:
        unit = "";
        break;
    }
    return unit;
  }

  calChange(amount) {
    const coins = [
      { value: 100 },
      { value: 50 },
      { value: 20 },
      { value: 10 },
      { value: 5 },
      { value: 1 },
      { value: 0.25 },
      { value: 0.1 },
      { value: 0.05 },
      { value: 0.01 }
    ];
    let res = [];
    for (let i = 0; amount > 0 && i < coins.length; i++) {
      let value = coins[i].value;

      if (value <= amount) {
        const val = Math.floor(amount / value);
        res.push({
          value: coins[i].value,
          total: val,
          text: this.getUnit(coins[i].value, val)
        });

        amount -= value * val;
        amount = amount.toFixed(2);
      }
    }
    this.setState({ change: res });
  }

  renderChange() {
    var change = this.state.change
      .map(item => {
        return `${item.total.toLocaleString()}: ${item.text}`;
      })
      .join(", ")
      .replace(/, ([^,]*)$/, " and $1");
    return change ? <div>{`Your change is ${change}.`}</div> : null;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <form>
              <FormGroup>
                <ControlLabel>Enter your amount:</ControlLabel>
                <FormControl
                  id="txtAmount"
                  type="text"
                  placeholder="0.00"
                  onChange={this.onChange}
                  value={this.state.value}
                  autoFocus
                />
              </FormGroup>
            </form>
          </Col>
        </Row>
        {this.renderChange()}
      </Grid>
    );
  }
}

export default ChangeCalculator;
