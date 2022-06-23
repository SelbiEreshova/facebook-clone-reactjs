exports.home = (req, res) => {
  res.status(200).json({
    message: "This is a message in json format",
  });
};
