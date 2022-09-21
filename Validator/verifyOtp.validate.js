const verifyOtpSchema = {
  otp: {
    notEmpty: true,
    errorMessage: "Field should not be empty",
  },
  username: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Username must be at least 6 characters long",
    },
    isString: { errorMessage: "User name should be string" },
  },
};
module.exports = verifyOtpSchema;
