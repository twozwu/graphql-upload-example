import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import UPLOAD_DIRECTORY_URL from "./config/UPLOAD_DIRECTORY_URL.mjs";
import makeDir from "make-dir";
import { fileURLToPath } from "url";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolves/index.js";
// const schema = makeExecutableSchema({ typeDefs, resolvers });
// import schema from "./graphql/index.js";

const app = express();

async function startApolloServer() {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // schema,
    csrfPrevention: false,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL));
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

// console.log(import.meta.url); // 取得本檔案路徑
// // file:///C:/Users/asus/Documents/%E5%BE%8C%E7%AB%AF/graphql%20upload/server.js
// console.log(new URL("./uploads/", import.meta.url)); // 取得uploads完整url路徑
// console.log(fileURLToPath(UPLOAD_DIRECTORY_URL)); // 將url路徑轉換成檔案路徑

app.use(
  graphqlUploadExpress({
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  })
);

startApolloServer();
