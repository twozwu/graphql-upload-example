import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import Header from "./components/Header";
import UploadFile from "./components/UploadFile";
import UploadFileList from "./components/UploadFileList";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  // uri: "http://localhost:4000/graphql",
  cache,
  link: createUploadLink({ uri: "http://localhost:4000/graphql" }),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <UploadFile />
          <hr />
          <UploadFileList />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
