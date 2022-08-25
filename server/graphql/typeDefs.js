import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Upload

  type File {
    id: ID
    name: String
    url: String
  }

  type Query {
    "註解"
    hello: String!
    uploads: [File]
  }
  
  type Mutation {
    singleUpload(file: Upload!): File
    multipleUpload(files: [Upload]!): [File]
  }
`;

export default typeDefs;
