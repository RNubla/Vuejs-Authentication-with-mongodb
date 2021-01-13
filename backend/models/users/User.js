const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    require: [true, "Please Include Your Name"],
  },
  email: {
    type: String,
    require: [true, "Please Include Your Email"],
  },
  password: {
    type: String,
    require: [true, "Please Include Your Password"],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
// hash password before saving the user model
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// generate auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    "secret"
  );
  await user.save();
  return token;
};

// search for a user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" });
  }
  return user;
};

User = mongoose.model("User", userSchema);
module.exports = User;
