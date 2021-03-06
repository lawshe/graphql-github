const startingRequest = () => {
  return {
    type: 'STARTING_REQUEST'
  }
}
const finishedRequest = (response) => {
  return {
    type: 'FINISHED_REQUEST',
    response: response
  }
}

export const getAccount = (login) => {
  return dispatch => {
    dispatch(startingRequest());
    let payload =  `{account(login: \"${login}\") {avatar_url, followers, followers_url, html_url, login, public_repos, repos_url, type}}`;
    return new Promise(function(resolve, reject) {
      let request=new XMLHttpRequest();
      request.open('POST', '/graphql', true);
      request.setRequestHeader('Content-Type', 'application/graphql');
      request.send(payload);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText)
        }
      }
    }).then(response => {
      dispatch(finishedRequest(JSON.parse(response)))
    })
  }
}
