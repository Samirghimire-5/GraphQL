const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const express = require("express");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

// Construct a schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      rollDice: {
        type: new GraphQLList(GraphQLFloat),
        args: {
          numDice: { type: new GraphQLNonNull(GraphQLInt) },
          numSides: { type: GraphQLInt },
        },
        resolve: (_, { numDice, numSides }) => {
          const output = [];
          for (let i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
          }
          return output;
        }
      },
    },
  }),
});

const app = express();

app.get("/graphql", (_req, res) => {
  res.type = "html";
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.all(
  "/graphql",
  createHandler({
    schema,
  })
);


app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
