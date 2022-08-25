import fileResolver from "./fileResolver.js";

export default {
  Query: {
    ...fileResolver.Query,
  },
  Mutation: {
    ...fileResolver.Mutation,
  },
};
