import { Component } from 'react';
import {connect} from "react-redux";
import { increment, decrement } from '../../reducers/counter.js'
import {bindActionCreators} from 'redux';

class CardClassComponent extends Component {
  decrement = () => {
    console.error('decrement');

    this.props.actions.decrement(1);
  }

  increment = () => {
    console.error('increment');

    this.props.actions.increment(1);
  }

  render () {
    return <div>
      <h1>This is Class Component</h1>
      <div>Total: <span>{ this.props.counter }</span></div>
      <div>
        <button onClick={this.increment} id="incrementBtn">+</button>
        <button onClick={this.decrement} id="decrementBtn">-</button>
      </div>
    </div>;
  }
}

const mapStateToProps = ({ counter }) => {
  return { counter };
};

const mapDispatchToProps = (dispatch) => {
  // const { showLoader, hideLoader } = loaderActions;

  return {
    actions: bindActionCreators({increment, decrement}, dispatch),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(CardClassComponent);
