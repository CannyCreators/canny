import Upload from "upload-js-full";

import fetch from "node-fetch";

const uploadManager = new Upload.UploadManager(

  new Upload.Configuration({

    fetchApi: fetch,

    apiKey: "YOUR_API_KEY" // e.g. "secret_xxxxx"

  })

);

uploadManager

  .upload({

    // ---------

    // Required:

    // ---------

    accountId: "kW15b2y", // This is your account ID.

    // Supported types for 'data' field:

    // - String

    // - Blob

    // - Buffer

    // - ReadableStream (Node.js), e.g. fs.createReadStream("file.txt")

    data: "Hello World",

    // Required when: 'data' is a stream.

    // size: 5098,

    // ---------

    // Optional:

    // ---------

    // Required when: 'data' is a stream, buffer, or string.

    mime: "text/plain",

    // Required when: 'data' is a stream, buffer, or string.

    originalFileName: "my_file.txt",

    // Supported when: 'data' is not a stream.

    maxConcurrentUploadParts: 4,

    metadata: {

      // Up to 2KB of arbitrary JSON.

      productId: 60891

    },

    tags: [

      // Up to 25 tags per file.

      "product_image"

    ],

    path: {

      // See path variables: https://upload.io/dashboard/docs/path-variables

      folderPath: "/uploads/{UTC_YEAR}/{UTC_MONTH}/{UTC_DAY}",

      fileName: "{UNIQUE_DIGITS_8}{ORIGINAL_FILE_EXT}"

    },

    cancellationToken: {

      // Set to 'true' after invoking 'upload' to cancel the upload.

      isCancelled: false

    }

  })

  .then(

    ({ fileUrl, filePath }) => {

      // --------------------------------------------

      // File successfully uploaded!

      // --------------------------------------------

      // The 'filePath' uniquely identifies the file,

      // and is what you should save to your DB.

      // --------------------------------------------

      console.log(`File uploaded to: ${fileUrl}`);

    },

    error => console.error(`Upload failed: ${e.message}`, e)

  );
