console.log({ starting: true })

import express from 'express'
import basicAuth from 'basic-auth-connect';
import graphqlHTTP from 'express-graphql'

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType
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

const LevelEnum = new GraphQLEnumType({
  name: 'PrivacyLevel',
  values: {
    PUBLIC: {
      value: 'public',
    },
    ACQUAINTANCE: {
      value: 'acquaintance'
    },
    FRIEND: {
      value: 'friend'
    },
    TOP: {
      value: 'top'
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  descritption: 'The root mutation',
  fields: {
    createPost: {
      type: PostType,
      args: {
        body: {
          type: new GraphQLNonNull(GraphQLString)
        },
        level: {
          type: new GraphQLNonNull(LevelEnum)
        }
      },
      resolve(source, args, context) {
        return loaders.createPost(args.body, args.level, context).then((nodeId) => loaders.getNodeById(nodeId))
      }
    }
  }
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

const Schema = new GraphQLSchema({
  types: [UserType, PostType],
  query: RootQuery,
  mutation: RootMutation
})
