import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import aws from 'aws-sdk';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const form = new formidable.IncomingForm();
      const url = await new Promise((resolve, reject) => {
        form.parse(req, async (error, fields, files) => {
          const s3 = new aws.S3({
            accessKeyId: undefined,
            secretAccessKey: undefined,
          });

          const stream = createReadStream(files.file.path);

          await s3
            .upload({
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: files.file.name!,
              ACL: 'public-read',
              Body: stream,
            })
            .promise()
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      });
      res.statusCode = 201;
      res.send(url);
    } catch (error) {
      console.log(error);
      res.end();
    }
  }

  res.statusCode = 405;

  return res.end();
};
