const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const express = require("express");
const port = 4000;

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
  `);

  const root = {
    quoteOfTheDay: () => {
      return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
    },
    random: () => {
      return Math.random();
    },
    rollThreeDice: () => {
      return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
  };

const app = express();

app.all('/graphqlTesting', createHandler({
  schema: schema,
  rootValue: root,
})
)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
