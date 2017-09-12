import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { testAction, testAsync } from './actions.js';

@connect(state => ({
  asyncData: state.main.get('asyncData'),
  asyncError: state.main.get('asyncError'),
  asyncLoading: state.main.get('asyncLoading'),
  counter: state.main.get('counter'),
}))
export default class Main extends Component {
  static propTypes = {
    asyncData: PropTypes.string,
    asyncError: PropTypes.object,
    asyncLoading: PropTypes.bool,
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  constructor() {
    super();

    this.handleAsyncButtonClick = this.handleAsyncButtonClick.bind(this);
    this.handleTestButtonClick = this.handleTestButtonClick.bind(this);
  }

  handleAsyncButtonClick() {
    const { dispatch } = this.props;

    dispatch(testAsync());
  }

  handleTestButtonClick() {
    const { dispatch } = this.props;

    dispatch(testAction());
  }

  render() {
    const {
      asyncData,
      asyncError,
      asyncLoading,
      counter,
    } = this.props;
    
    return (
      <div className='MainPage'>
        <h1>MainPage</h1>

        <h3>Synchronous action</h3>
        <div className='Example'>
          <p>Counter: { counter }</p>
          <button onClick={ this.handleTestButtonClick }>
            Increase
          </button>
        </div>

        <h3>Async action example</h3>
        <div className='Example'>
          { asyncData &&
            <p>
              Date: { asyncData.date }<br />
              Time: { asyncData.time }<br />
              Miliseconds since epoch: { asyncData.milliseconds_since_epoch }
            </p> }
          { asyncLoading && <p>Loading...</p> }
          { asyncError && <p>Error: { asyncError }</p> }
          <button
            disabled={ asyncLoading }
            onClick={ this.handleAsyncButtonClick }
          >
            Get async data
          </button>
        </div>
        
      </div>
    );
  }
}