import React from 'react';
import { connect } from 'react-redux';
import { getAccount } from '../actions/actions.js';
import Loading from './partials/Loading.js';
import Account from './partials/Account.js';

let Query = React.createClass({
  componentDidMount() {
    this.props.dispatch(
      getAccount('lawshe')
    );
  },
  render() {
    let dispatch = this.props.dispatch;
    let fetchInProgress = String(this.props.store.get('fetching'));
    let queryText;
    let account = this.props.store.get('data').toObject();

    let loadingJsx = (this.props.store.get('fetching') === true) ?
      <div>
        <Loading />
      </div>
    : <div></div>;

    let resultsJsx = (account && account.login) ?
      <div>
        <Account account={account} />
      </div>
    : <div className="card-panel grey lighten-4 z-depth-0">No Results</div>;

    return (
      <div>
        <h1 className="center">GitHub User Search</h1>
        <div className="row">
          <form className="card-panel brown darken-1 z-depth-0 col s12 m6 offset-m3">
            <div className="row">
              <div className="input-field col s12">
                <input ref={node => {queryText = node}} placeholder="login"></input>
              </div>
              <div className="input-field col s12">
                <button className="btn btn-flat cyan" onClick={(e) => {
                  e.preventDefault();
                  dispatch(getAccount(queryText.value))}
                }>
                  query
                </button>
              </div>
            </div>
          </form>
        </div>
        {loadingJsx}
        {resultsJsx}
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    store: state
  }
};

export const QueryContainer = connect(
  mapStateToProps
)(Query);
