console.log({ starting: true })

import express from 'express'
import basicAuth from 'basic-auth-connect';
import graphqlHTTP from 'express-graphql'

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import {
  NodeInterface,
  UserType,
  PostType
} from './src/types'

import * as loaders from './src/loaders'

const app = express()

app.use(basicAuth(function (user, pass) {
  return user === '5' && pass === 'mypassword1';
}))

app.use('/graphql', graphqlHTTP((req) => {
  const context = 'users:' + req.user
  return {
    schema: Schema,
    graphiql: true,
    context: context,
    pretty: true
  }
}))

app.listen(3000, () => {
  console.log({ running: true })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: {
    viewer: {
      type: NodeInterface,
      resolve(source, args, context) {
        console.log(context)
        return loaders.getNodeById(context)
      }
    },
    node: {
      type: NodeInterface,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(source, args, context, info) {
        return loaders.getNodeById(args.id);
      }
    }
  }
})

let inMemoryStore = {}
const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation',
  fields: {
    setNode: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        value: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(source, args) {
        inMemoryStore[args.key] = args.value
        return inMemoryStore[args.key]
      }
    }
  }
})

const Schema = new GraphQLSchema({
  types: [UserType, PostType],
  query: RootQuery,
  mutation: RootMutation
})
