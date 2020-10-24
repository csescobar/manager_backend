const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    company: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isNew) {
    const hash = await bcrypt.hash(this.email + this.password, 10);
    this.password = hash;
  }
  next();
});

module.exports = model("User", UserSchema);
