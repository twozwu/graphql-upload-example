// import { gql } from "@apollo/client/core";
// import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient.js";
// import { useMutation } from "@apollo/client/react/hooks/useMutation.js";
import { gql, useMutation, useApolloClient } from "@apollo/client";

const MULTIPLE_UPLOAD_MUTATION = gql`
  mutation multipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
    }
  }
`;

export default function UploadFileList() {
  const [multipleUploadMutation] = useMutation(MULTIPLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  function onChange({ target: { validity, files } }) {
    if (validity.valid && files && files[0])
      multipleUploadMutation({ variables: { files } }).then(() => {
        apolloClient.resetStore();
      });
  }

  return (
    <>
      <h2>Files Upload：</h2>
      <input type="file" value="" onChange={onChange} multiple />
    </>
  );
}
