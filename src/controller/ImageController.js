module.exports = {
  newImage(req, res) {
    console.log(req.file);
    console.log(req.body);
    res.status('202').send({});
  },
};
