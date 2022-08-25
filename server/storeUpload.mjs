// @ts-check

import { createWriteStream, unlink } from "fs";
import shortId from "shortid";

import UPLOAD_DIRECTORY_URL from "./config/UPLOAD_DIRECTORY_URL.mjs";

export default async function storeUpload(upload) {
  const { createReadStream, filename } = await upload.file;
  // console.log(upload);
  const stream = createReadStream();
  const storedFileName = `${shortId.generate()}-${filename}`;
  const storedFileUrl = new URL(storedFileName, UPLOAD_DIRECTORY_URL);

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(storedFileUrl);

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", (error) => {
      unlink(storedFileUrl, () => {
        reject(error);
      });
    });

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    // 將寫入流加入到讀取流中(先寫入再讀取)
    stream.pipe(writeStream);
  });

  return storedFileName;
}
