import multer from "multer";
import { resolve, extname } from "path";

type Response = {
  storage: multer.StorageEngine;
};

export default {
  upload(folder: string): Response {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileName = `${request.body.fia}_${request.body.type}${extname(
            file.originalname
          )}`;
          return callback(null, fileName);
        },
      }),
    };
  },
};
