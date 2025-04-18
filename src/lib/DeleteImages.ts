import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Deletes multiple objects from S3
 * @param keys Array of object keys (filenames or paths in S3)
 */
export const deleteMultipleFromS3 = async (keys: string[]) => {
  if (!keys.length) return;

  try {
    const command = new DeleteObjectsCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
        Quiet: false,
      },
    });

    const response = await s3.send(command);
    console.log('Deleted from S3:', response.Deleted);
    if (response.Errors?.length) {
      console.error(' Errors while deleting:', response.Errors);
    }
    console.log('dlt images :',response)
    return response;
  } catch (error) {
    console.error('Failed to delete objects from S3:', error);
    throw error;
  }
};
