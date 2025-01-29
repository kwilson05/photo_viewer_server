const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: JSON.parse(process.env.GCS_KEY_FILE),
});
const myBucket = storage.bucket(process.env.GCS_BUCKET_NAME);

module.exports.saveBinaryImage = async function (
  imageFileName,
  imageBufferArray
) {
  const file = myBucket.file(imageFileName);
  await file.save(imageBufferArray);
  return file;
};

module.exports.delete = async function (filePath) {
  return await myBucket.file(filePath).delete();
};
