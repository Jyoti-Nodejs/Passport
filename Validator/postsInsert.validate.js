const postsSchema = {
  description: {
    notEmpty: false,
    errorMessage: "Field should not be empty",
  },
};

module.exports = postsSchema;
