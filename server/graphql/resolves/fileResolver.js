import UPLOAD_DIRECTORY_URL from "../../config/UPLOAD_DIRECTORY_URL.mjs";
import storeUpload from "../../storeUpload.mjs";
import fs from "fs";

export default {
  Query: {
    hello: () => "Hey!",
    uploads: async () => {
      const list = await fs.promises.readdir(UPLOAD_DIRECTORY_URL);
      return list.map((storedFileName) => ({
        id: storedFileName,
        name: storedFileName,
        url: new URL(storedFileName, UPLOAD_DIRECTORY_URL),
      }));
    },
  },
  Mutation: {
    singleUpload: async (parent, { file }) => {
      // console.log(file);
      const storedFileName = await storeUpload(file);
      return {
        id: storedFileName,
        name: storedFileName,
        url: new URL(storedFileName, UPLOAD_DIRECTORY_URL),
      };
    },
    multipleUpload: async (parent, { files }) => {
      const storedFileNames = [];

      // Ensure an error storing one upload doesn’t prevent storing the rest.
      for (const result of await Promise.allSettled(files.map(storeUpload)))
        if ("value" in result) storedFileNames.push(result.value);
        // Realistically you would do more than just log an error.
        else console.error(`Failed to store upload: ${result.reason}`);

      return storedFileNames.map((storedFileName) => ({
        id: storedFileName,
        name: storedFileName,
        url: new URL(storedFileName, UPLOAD_DIRECTORY_URL),
      }));
    },
  },
};
