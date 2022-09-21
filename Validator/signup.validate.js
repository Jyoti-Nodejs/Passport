const signupSchema = {
  // id: {
  //   notEmpty: true,
  //   errorMessage: "ID is wrong",
  // },
  name: {
    notEmpty: true,
    errorMessage: "Field should not be empty",
  },
  email: {
    isEmail: true,
    errorMessage: "Please enter a valid email address",
  },
  username: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Username must be at least 8 characters long",
    },
    isString: { errorMessage: "User name should be string" },
  },
  password: {
    isStrongPassword: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      errorMessage:
        "Password must be greater than 6 and contain at least one uppercase letter, one lowercase letter, one special character, and one number",
    },
  },
};

module.exports = signupSchema;
