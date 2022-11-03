const mongoose = require("mongoose");
const { hash } = require("../utils/bcrypt");

let UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const self = this;

  self.password = await hash(self.password);
});

module.exports = mongoose.model("User", UserSchema, "User");
