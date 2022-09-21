const commentSchema = {
  comment: {
    notEmpty: true,
    errorMessage: "Field should not be empty",
  },
};

module.exports = commentSchema;
