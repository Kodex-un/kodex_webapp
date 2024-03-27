const { createUploader } = require("bufferbus");
const busboy = require("busboy");
const { NextFunction, Request, Response } = require("express");
const { Readable } = require("stream");
const creds = require("../../kodex-un-415118-6a00a782dabf.json");

const uploadToFirebase = createUploader({
  platform: "firebase",
  config: creds,
});

type Config = {
  types: string[];
};

const FILE_TYPES = {
  AUDIO: "audio",
  IMAGE: "image",
  TEXT: "text",
  VIDEO: "video",
};

const fileTypeMap = {
  [FILE_TYPES.AUDIO]: [],
  [FILE_TYPES.TEXT]: [],
  [FILE_TYPES.IMAGE]: ["image/png"],
  [FILE_TYPES.VIDEO]: [],
};

exports.fileHandler = (config: Config) => {
  return async (
    req: typeof Request,
    res: typeof Response,
    next: typeof NextFunction,
  ) => {
    try {
      const { fileStream, fileName, mimeType } = await new Promise<{
        fileStream: typeof Readable;
        fileName: string;
        mimeType: string;
        name: string;
      }>((resolve, reject) => {
        const bb = busboy({ headers: req.headers });

        bb.on("file", (name: string, file: any, info: any) => {
          resolve({
            fileStream: file,
            fileName: info.filename,
            mimeType: info.mimeType,
            name: name,
          });
        });

        bb.once("close", resolve)
          .once("error", reject)
          .on("file", (_name: any, file_stream: any) => {
            file_stream.resume();
          })
          .end(req.rawBody);

        bb.on("error", (err: any) => reject(err));
        req.pipe(bb);
      });

      const allowedTypes: string[] = (config.types || []).reduce(
        (total: string[], item: string) => {
          if (item in fileTypeMap) {
            total.push(...fileTypeMap[item]);
          }
          return total;
        },
        [],
      );

      if (allowedTypes.includes(mimeType)) {
        const fileUrl = await uploadToFirebase({
          fileName,
          data: fileStream,
          mimeType,
        });
        req.body = { ...req.body, fileUrl, fileName, mimeType };
      } else {
        // TODO:Marov - add error codes
        req.body = {
          ...req.body,
          error: {
            message: "Unsupported file type",
          },
        };
      }

      next();
    } catch (err) {
      console.log(err);
      let message = "Something went wrong";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send(message);
    }
  };
};

exports.FILE_TYPES = FILE_TYPES;
