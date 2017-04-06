var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var axios = require('axios');
var path = require('path');
var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLNonNull = graphql.GraphQLNonNull;
var GraphQLInt = graphql.GraphQLInt;

// GraphQL
var accountType = new GraphQLObjectType({
  name: "Account",
  description: "Account information on GitHub",
  fields: {
    login: {
      type: GraphQLString,
      description: "Login for account"
    },
    avatar_url: {
      type: GraphQLString,
      description: "Image for account"
    }
  }
});
var queryType = new GraphQLObjectType({
  name: "query",
  description: "Account query",
  fields: {
    account: {
      type: accountType,
      args: {
        login: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The login handle"
        }
      },
      resolve: function(_, args){
        const apiUrl = 'https://api.github.com/users/' + args.login;
        return axios.get(apiUrl)
          .then((response) => {
            return response.data;
          });
      }
    }
  }
});
var schema = new GraphQLSchema({
  query: queryType
});

// GraphQL Server
var graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(8080);
console.log('The GraphQL Server is running.')

// configure webpack
var compiler = webpack({
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
});

// serve bundled
var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${8080}`},
  publicPath: '/static/',
  stats: {colors: true}
});
app.use('/', express.static('static'));
app.listen(process.env.PORT || 3000);
console.log('The App Server is running.')
