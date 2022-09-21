const postsUpdateSchema = {
  description: {
    notEmpty: true,
    errorMessage: "Field should not be empty",
  },
};

module.exports = postsUpdateSchema;
