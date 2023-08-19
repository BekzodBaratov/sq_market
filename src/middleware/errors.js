module.exports = function (err, req, res, next) {
  res.status(500).send("Serverda kutilmagan xato ro'y berdi", err.message);
};
