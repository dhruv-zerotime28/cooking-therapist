import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import logger from '@/lib/logger';


const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  const s3BucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!s3BucketName) {
    return NextResponse.json({ error: 'Missing bucket name' }, { status: 500 });
  }

  try {
    const body = await request.json(); // expects: [{ fileName, contentType }] validate it
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const urls = await Promise.all(
      body.map(async ({ fileName, contentType, recipeName }) => {
        const command = new PutObjectCommand({
          Bucket: s3BucketName,
          Key: `${recipeName}/${fileName}`,
          ContentType: contentType,
        });

        const signedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 3600,
        });

        //get the url to saved in db
        const urlForDb = signedUrl.split('?')[0];
        return { fileName, url: signedUrl, dbUrl: urlForDb };
      })
    );

    return NextResponse.json(
      { success: true, message: `all listed categories`, data: urls },
      { status: 200 }
    );
  } catch (error) {
    logger.debug('api err while genering pre-signed url :', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
