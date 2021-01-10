const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: JSON.parse(process.env.GCS_KEY_FILE),
});
const myBucket = storage.bucket(process.env.GCS_BUCKET_NAME);

module.exports.newImage = function(req, res) {
  console.log(req.file);
  const file = myBucket.file(req.file.originalname);

  file.save(req.file.buffer, function(err) {
    if (!err) {
      console.log('SUCCESS SENT IMAGE');
      res.status('202').send({});
    }
  });
};
