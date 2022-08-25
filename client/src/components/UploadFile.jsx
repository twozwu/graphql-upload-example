// import { gql } from "@apollo/client/core";
// import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient.js";
// import { useMutation } from "@apollo/client/react/hooks/useMutation.js";
import { gql, useMutation, useApolloClient } from "@apollo/client";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;

export default function UploadFile() {
  // uploadFileMutation名稱可隨意自訂
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  function onChange({ target: { validity, files } }) {
    if (validity.valid && files && files[0])
      uploadFileMutation({ variables: { file: files[0] } }).then(() => {
        apolloClient.resetStore(); // 重置暫存區
      });
  }

  return (
    <>
      <h2>File Upload：</h2>
      <input type="file" value="" onChange={onChange} />
    </>
  );
}
