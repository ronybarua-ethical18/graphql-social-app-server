const { ApolloServer } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions');
const mongoose =require('mongoose')

const typeDefs = require('./graphQL/typeDefs')
const resolvers = require('./graphQL/resolvers')
const { MONGODB } = require('./config.js')

const pubsub = new PubSub()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({ req, pubsub })
})

const PORT = process.env.PORT || 5000

mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    console.log('MongoDB Connected')
    return server.listen({port: PORT})
})
.then(res => {
    console.log(`Server running at ${res.url}`)
})
.catch(err => console.error(err))