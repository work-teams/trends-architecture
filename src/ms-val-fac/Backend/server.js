/* Resolvers */
import {users } from './data.js'; //fake data
const resolvers = {
    Query: {
        users: () => {
          return users.map(u => ({
            name: u.name,
            id: u.id
          }));
        },

        user: (_, { id }) => {
            const userToReturn = users.find(u => u.id === id);
            return userToReturn;
        },

      }
}


import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'

// Carga la definición de tipos
const typeDefs = loadSchemaSync('./graphql/index.graphql', {
    loaders: [new GraphQLFileLoader()]
});

// Asocia los tipos con loss resolvers creando el schema
const schema = addResolversToSchema({
    schema: typeDefs,
    resolvers,
})


const app = express();
app.use(cors()) // Nos aseguramos de poder acceder al servidor
// Añade el servicio graphql y graphiql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(4001)
console.log('Tu servidor GraphQL esta corriendo en <http://localhost:4001/graphql>')