const loginSchema = {
  username: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Username must be at least 8 characters long",
    },
  },
  password: {
    // isLength: {
    //   errorMessage: "Password should be at least 6 chars long",
    //   // Multiple options would be expressed as an array
    //   options: { min: 6 },
    // },
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

module.exports = loginSchema;
