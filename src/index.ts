require("reflect-metadata");

import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
const express = require("express");
const {ApolloServer} = require("apollo-server-express");

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  const server = new ApolloServer({schema});
  await server.start();

  const app = express();
  server.applyMiddleware({app});

  app.listen(8000, () => {
    console.log("Server started on port 8000");
  })
}

main()