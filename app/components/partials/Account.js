import React from 'react';

export default (props) => {
  let follwersWord = props.account.followers > 1 ? 'Followers' : 'Follower';
  let followersJsx = props.account.followers > 0 ?
    <p><a href={ props.account.followers_url } target="_BLANK">{ props.account.followers } { follwersWord }</a></p>
  : <div></div>;

  let locationJsx = props.account.location ?
    <div><i className="material-icons">location_on</i>{ props.account.location }</div>
  : <div></div>;

  let reposWord = props.account.public_repos > 1 ? 'Repos' : 'Repo';
  let repoJsx = props.account.public_repos > 0 ?
    <div><a href={ props.account.repos_url }>{ props.account.public_repos } { reposWord }</a></div>
  : <div></div>;


  let accountJsx = ( props.account && props.account.login) ?
  <div className="card-panel grey lighten-4 z-depth-0">
    <div className="row valign-wrapper">
      <div className="col s1">
        <a href={ props.account.html_url }>
          <img className="circle" src={ props.account.avatar_url } style={{ width: '100%' }} />
        </a>
      </div>
      <div className="col s11">
        <h3><a href={ props.account.html_url } target="_BLANK">{ props.account.login }</a><span className="chip right">{ props.account.type }</span></h3>
      </div>
    </div>
    <div className="row valign-wrapper">
      <div className="col s12">
        { locationJsx }
        { followersJsx }
        { repoJsx }
      </div>
    </div>
  </div>
  : <div></div>;

  return accountJsx;
};
