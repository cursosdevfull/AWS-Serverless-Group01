import { middyfy } from '@libs/lambda';
import * as aws from 'aws-sdk';

const eventos3 = async (event) => {
  const s3 = event.Records[0].s3;
  const bucketName = s3.bucket.name;
  const key = s3.object.key;

  console.log(`Bucket: ${bucketName}`);
  console.log(`Key: ${key}`);

  const parameters = { Bucket: bucketName, Key: key };

  const s3Client = new aws.S3();
  s3Client.getObject(parameters, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(data);
  });
};

export const main = middyfy(eventos3);
