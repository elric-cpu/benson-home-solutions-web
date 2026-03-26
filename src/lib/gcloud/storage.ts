import { Storage } from '@google-cloud/storage';

const storage = new Storage();

/**
 * Gcloud Storage Client (Benson Native)
 * Handles all project visual and field documentation asset storage.
 */
export const bucket = storage.bucket(process.env.GCS_BUCKET_NAME || '');

export async function uploadToGcs(filePath: string, destFileName: string) {
  await bucket.upload(filePath, {
    destination: destFileName,
    gzip: true,
  });
  return `https://storage.googleapis.com/${bucket.name}/${destFileName}`;
}

export async function deleteFromGcs(fileName: string) {
  await bucket.file(fileName).delete();
}
