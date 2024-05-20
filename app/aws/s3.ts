import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'

const client = new S3Client({
  region: 'us-east-2'
})

const getS3ObjectBody = async (bucketObject:any) => {
  try {
    const prevOverallStatus = await bucketObject?.Body?.transformToString()
    return prevOverallStatus || null
  } catch (error) {
    console.error('Error [getS3ObjectBody]:', error)
  }
}

export async function getS3Object() {
  const bucketObject = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: 'shopify_status.txt',
  })

  try {
    const getS3Object = await client.send(bucketObject)
    const previousOverallStatus = getS3Object.$metadata.httpStatusCode === 200 ?
      getS3ObjectBody(getS3Object)
      :
      null

    return previousOverallStatus
  } catch (error) {
    console.error('Error [getS3Object]:', error)
  }
}

export async function putS3Object(status:string) {
  const putS3Object = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: 'shopify_status.txt',
    Body: status,
  })

  try {
    const putS3ObjectCmd = await client.send(putS3Object)

    if (putS3ObjectCmd.$metadata.httpStatusCode === 200) {
      console.log('Shopify Status Updated')
    }
  } catch (error) {
    console.error('Error [putS3Object]:', error)
  }
}